import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import pRetry from "p-retry";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        return pRetry(
          async () => {
            try {
              return await query(args);
            } catch (error: any) {
              if (error.code === "P1001") {
                console.warn(
                  `Retrying ${model}.${operation} due to connection error...`,
                );
                await prisma.$disconnect();
                await prisma.$connect();
                throw error;
              }
              throw error;
            }
          },
          { retries: 2 },
        );
      },
    },
  },
});

export { prisma };
