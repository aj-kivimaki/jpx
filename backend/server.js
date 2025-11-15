import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import gigsRouter from "./routes/gigs.js";

dotenv.config();
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jpartynen.netlify.app",
      "https://jpartynen.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/gigs", gigsRouter);

app.get("/", (req, res) => res.send("Band API is live!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
