import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
     const alicePassword = await bcrypt.hash("alice", 10);
     const bobPassword = await bcrypt.hash("bob", 10);
     const alice = await prisma.user.upsert({
          where: { number: 12345678 },
          update: {},
          create: {
               number: 12345678,
               password: alicePassword,
               name: "alice",
               Balance: {
                    create: {
                         amount: 20000,
                         locked: 0,
                    }
               },
               OnRampTransaction: {
                    create: {
                         startTime: new Date(),
                         status: "Success",
                         amount: 20000,
                         token: "123",
                         provider: "HDFC Bank"
                    }
               }
          }
     })
     const bob = await prisma.user.upsert({
          where: { number: 123456789 },
          update: {},
          create: {
               number: 123456789,
               password: bobPassword,
               name: "bob",
               Balance: {
                    create: {
                         amount: 4000,
                         locked: 1000
                    }
               },
               OnRampTransaction: {
                    create: {
                         startTime: new Date(),
                         status: "Failure",
                         amount: 4000,
                         token: "121",
                         provider: "HDFC Bank"
                    }
               }
          }
     })
     console.log({ alice, bob });
}
main()
     .then(async () => {
          await prisma.$disconnect()
     })
     .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          process.exit(1);
     })