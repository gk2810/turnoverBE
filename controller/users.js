const bcrypt = require("bcryptjs");
const { Users } = require("../models/users");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup for Users
 *     description: Create new users.
 *     responses:
 *       '200':
 *         user: user data
 *       '400':
 *         msg: "email and password are required"
 */

exports.signup = async (req, res) => {
    try {
        let { email, name, password } = req.body;
        console.log("email, name, password", email, name, password);
        if (!(email && password)) {
            return res.status(400).json({ msg: "email and password are required" })
        }
        password = bcrypt.hashSync(password, 10);

        let user = await prisma.user.create({
            data: {
                name, email, password
            }
        })
        console.log("user >_", user);
        return res.status(200).json({ user });
    } catch (error) {
        console.log("error >_", error);
        return res.status(500).json({ msg: "Something went wrong", status: false });
    }
}

exports.login = async (req, res) => {
    try {
        let { password, email } = req.body;
        if (!(password && email)) {
            return res.status(400).json({ msg: "email and password are required" })
        }
        let DBuser = await prisma.user.findUnique({
            where: { email: email }
        })
        let isMatch = bcrypt.compareSync(password, DBuser.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, msg: "Invalid Credential" })
        }
        let token = jwt.sign({ id: DBuser.id }, process.env.JWT_SECRET)
        return res.status(200).json({ token: `Bearer ${token}` })
    } catch (error) {
        console.log("error >_", error);
        return res.status(500).json({ msg: "Something went wrong", status: false });
    }
}

exports.protectedData = async (req, res) => {
    try {
        let { page } = req.query;
        let skip = (page - 1) * 6;
        let count = await prisma.category.count();
        let data = await prisma.category.findMany({ skip: skip, take: 6 });
        return res.status(200).json({ data: data, count: count })
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({ status: false, msg: "Something went wrong" })
    }
}

exports.markCategory = async (req, res) => {
    try {
        let { category } = req.body;
        console.log(":: category ::", category);
        if (!category) {
            return res.status(400).json({ msg: "list of category is required", status: false });
        }
        let user = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                categories: category
            }
        })
        console.log(":: user ::", user);
        if (user) {
            return res.status(200).json({ data: user })
        } else {
            return res.status(400).json({ msg: "category is not updated" });
        }
    } catch (error) {
        console.log("error >_", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
}

exports.getMarkedData = async (req, res) => {
    try {
        let user = req.user;
        user = await prisma.user.findUnique({ where: { id: user.id }, select: { "categories": true } });
        return res.status(200).json({ categories: user.categories });
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({ status: false, msg: "Something went wrong" })
    }
}