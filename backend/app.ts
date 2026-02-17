import "dotenv/config";
import "./config/passport";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRouter";
import authRouter from "./routes/authRouter";
import categoriesRouter from "./routes/categoriesRouter";
import pRetry from "p-retry";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    error: {
      code: err.statusCode || 500,
      message: err.message ? [err.message] : ["Internal Server Error"],
    },
  });
});

await pRetry(
  async () => {
    await prisma.$connect();
    console.log("Database connected");
  },
  {
    onFailedAttempt: (err) => {
      console.warn(
        `Database not ready, attempt ${err.attemptNumber} failed. ${err.retriesLeft} retries left.`,
      );
    },
  },
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
});
