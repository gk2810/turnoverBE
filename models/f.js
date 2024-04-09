const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

let categories = [];

// while (categories.length < 100) {
//     let department = faker.commerce.department()
//     if (!categories.includes(department)) {
//         categories.push({ category: department })
//     }
// }

exports.fakerData = async (req, res) => {
    try {
        let data = await prisma.category.createMany({ data: categories });
        return res.status(200).json({ msg: "data created", status: true })
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({ msg: "Something went wrong", status: false, })
    }
}