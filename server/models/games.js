const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  id: String,
  gamedate: String,
  day: String,
  date: String,
  month: String,
  time: String,
  cutofftime: String,
  gametime: String,
  visitor: String,
  home: String,
  seasonflag: String,
  lock1: String,
  finalscorevisitor: String,
  sports: String,
  league: String,
  finalscorehome: String,
  vagainstspreadpoints: String,
  hagagnstspreadpoints: String,
  voverunderrate: String,
  hoverunderrate: String,
  gameended: String,
  vpickscorepoints: String,
  hpickscorepoints: String,
  vpickwinnerpoints: String,
  hpickwinnerppoints: String,
  vagainstthespreadrate: String,
  hagainstthesreadrate: String,
  hoverunderpoints: String,
  voverunderpoints: String,
  "v-ml": String,
  "h-ml": String,
  "v-sprd": String,
  "h-sprd": String,
  "v-sprd-odds": String,
  "h-sprd-odds": String,
  "v-ou": String,
  "h-ou": String,
  "v-ou-odds": String,
  "h-ou-odds": String,
  winner: String,
  ptsregualtion: String,
  ptsovertime: String,
  ptsshootout: String,
  bothpickscore: String,
  scoreentered: String,
  PredictionDateTimeStarting: String,
  eldatetime: String,
  oddsset: String,
  oddssetdate: String,
  oddssettime: String,
  postponeflag: String,
  orggamedate: String,
  suspended: String,
  vresult: String,
  hresult: String,
  nflweek: String,
  conference: String,
  devision: String,
  timestamp: String,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
