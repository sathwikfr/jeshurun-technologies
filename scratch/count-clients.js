const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.client.count().then(c => {
    console.log('Total clients:', c);
    prisma.$disconnect();
});
