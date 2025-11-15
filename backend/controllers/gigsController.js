import fs from "node:fs/promises";

const jsonString = await fs.readFile("./gigs.json", "utf8");
const gigs = JSON.parse(jsonString);

export const getGigs = (req, res) => {
  res.json(gigs);
};

export const addGig = (req, res) => {
  const newGig = { id: gigs.length + 1, ...req.body };
  gigs.push(newGig);
  res.status(201).json(newGig);
};
