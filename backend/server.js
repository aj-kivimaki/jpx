import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gigsRouter from "./routes/gigs.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/gigs", gigsRouter);

app.get("/", (req, res) => res.send("Band API is live!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
