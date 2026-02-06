import passport from "passport";
import { AppError } from "../errors/AppError";

export function isAuth(req: any, res: any, next: any) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}

export const isAdminAuth = [
  isAuth,
  (req: any, res: any, next: any) => {
    if (req.user.role === "ADMIN") {
      return next();
    } else {
      throw new AppError(
        "Hold up, superstar! You're fabulous, but this backstage is strictly VIP. " +
          "Only crowned admins get to strut past this velvet rope.",
        403,
      );
    }
  },
];
