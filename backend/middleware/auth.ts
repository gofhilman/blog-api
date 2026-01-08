import passport from "passport";

export default function auth(req: any, res: any, next: any) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}
