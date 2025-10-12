import express from "express";
import { getGigs, addGig } from "../controllers/gigsController.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", addGig);

export default router;
