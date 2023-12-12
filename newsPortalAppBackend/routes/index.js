import express from "express";
import { getUsers, login, logout, register } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { getNews, savedNews } from "../controllers/SavedNews.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

router.post("/savedNews", verifyToken, savedNews);
router.get("/savedNews", verifyToken, getNews);

export default router;
