import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

function meGet(req: any, res: any) {
  const { username, role } = req.user;
  res.json({ user: { username, role } });
}

async function signupPost(req: any, res: any) {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      role,
      password: hashedPassword,
    },
    select: {
      username: true,
      role: true,
    },
  });
  res.json({ user });
}

async function loginPost(req: any, res: any) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return jwt.sign(
        { sub: user.id, role: user.role },
        process.env.JWT_SECRET ??
          (() => {
            throw new Error("JWT_SECRET missing");
          })(),
        { expiresIn: "1 week" },
        (err, token) => {
          res.json({ token });
        }
      );
    }
  }
  throw new AppError("Invalid username or password", 401);
}

export { meGet, signupPost, loginPost };
