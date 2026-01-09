import { body } from "express-validator";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "Trying to log in without a username? Sweetie, we need to know " +
        "who's knocking before we open the velvet rope."
    ),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "No password? This isn't a casual stroll, it's a secured entrance. " +
        "Flash the credentials or sashay away!"
    ),
];

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "You're registering, darling. That means choosing a name that slaps, " +
        "sparkles, and screams main character energy. Don't ghost us!"
    )
    .custom(async (username) => {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (user) {
        throw new AppError(
          "That username's already booked and busy, darling. Try something with more sparkle!",
          409
        );
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "A new account without a password? That's like wearing heels with no attitude. " +
        "Lock it down, secure your sparkle, and strut into the system!"
    ),
];

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, a post without a title? That's like serving tea without the drama. " +
        "Give us a headline that slays, sparkles, and makes the feed stop scrolling!"
    )
    .matches(/[\p{L}\p{N}]/u)
    .withMessage(
      "Honey, your title needs at least one letter or number. " +
        "No ghost posts, no empty vibes, serve us something that actually walks the runway!"
    ),
  body("subtitle")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, a post without a subtitle? That's like a diva without a catchphrase. " +
        "Give us that extra sparkle, the tagline that makes the crowd scream encore!"
    ),
  body("content")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, a post without content? That's like a runway with no models. " +
        "Serve the drama, spill the tea, and give us words that sparkle!"
    ),
  body("categories")
    .isArray()
    .withMessage(
      "Sweetheart, your categories need to be an array. " +
        "Think of them as your entourage-organized, fabulous, and ready to support the main act!"
    )
    .custom((array) => {
      if (array.length === 0) return true;
      if (array.some((item: any) => item.trim() === "")) {
        throw new AppError(
          "Darling, empty categories are like backup dancers forgetting their steps. " +
            "Every category needs to bring the sparkle, not dead air!",
          400
        );
      }
      return true;
    }),
];

const validateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, a comment without content? That's like clapping with no hands. " +
        "Spill the tea, drop the shade, or share the love, but don't leave us hanging!"
    ),
];

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, a category without a name? That's like a fashion line without a label. " +
        "Give it a name that slays and tells the world what it stands for!"
    )
    .matches(/[\p{L}\p{N}]/u)
    .withMessage(
      "Honey, your category name needs at least one letter or number. " +
        "No ghost names, no empty vibes, serve us something that actually belongs on the marquee!"
    ),
];

export {
  validateLogin,
  validateSignup,
  validatePost,
  validateComment,
  validateCategory,
};
