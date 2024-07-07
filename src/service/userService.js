// userService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by ID: ${error.message}`);
  }
}

module.exports = {
  findUserById,
};
