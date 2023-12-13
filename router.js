import express from "express";
import data from "./database/headtohead.json" assert { type: "json" };
import { getMediane } from "./utils/mediane.js";
const router = express.Router();

router.get("/players", (req, res) => {
  try {
    const players = data.players.sort((playerA, playerB) =>
      playerA.data.rank > playerB.data.rank ? 1 : -1
    );
    res.json(players);
  } catch (e) {
    res.status(500).send("Internal error");
  }
});

router.get("/player/:id", (req, res) => {
  try {
    const player = data.players.find((player) => player.id == req.params.id);
    if (!player) {
      res.status(404).send("Player not found");
      return;
    }
    res.json(player);
  } catch (e) {
    res.status(500).send("Internal error");
  }
});

router.get("/stats", (req, res) => {
  try {
    const winnerCountry = data.players
      .map(({ country, data: { last } }) => {
        return {
          country,
          ratio: last.reduce((sum, result) => sum + result, 0),
        };
      })
      .sort((countryA, countryB) => (countryA.ratio < countryB.ratio ? 1 : -1))
      .shift();
    const IMC =
      data.players
        .map(({ data: { weight, height } }) => weight / height)
        .reduce((sum, result) => sum + result, 0) / data.players.length;

    const playerHeigths = data.players.map(({ data: { height } }) => height);

    const Mediane = getMediane(playerHeigths);

    res.json({ Mediane, IMC, winnerCountry });
  } catch (e) {
    res.status(500).send("Internal error");
  }
});

export default router;
