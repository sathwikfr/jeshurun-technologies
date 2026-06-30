const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const clients = await prisma.client.findMany();
  console.log("Client names from DB:", clients.map(c => c.name || c.companyName || JSON.stringify(c)));
}

main().catch(console.error).finally(() => prisma.$disconnect());
