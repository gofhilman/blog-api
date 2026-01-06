import "dotenv/config";
import "./config/passport";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/postsRouter";
import authRouter from "./routes/authRouter";
import categoriesRouter from "./routes/categoriesRouter";

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
      message: err.message || "Internal Server Error",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
});
