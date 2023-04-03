"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let interval = 5000;
const PORT = process.env.PORT || 4000;

let tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 1, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function generateQuotes(tickers) {
  return tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(-200, 200, 1),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = generateQuotes(tickers);

  socket.emit("ticker", quotes);
}
let timer;

const setTimer = (socket, newInterval) => {
  clearInterval(timer);

  timer = setInterval(function () {
    getQuotes(socket);
  }, newInterval);
};

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  setTimer(socket, interval);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors({ credentials: true, origin: true }), express.json());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/tickers", function (req, res) {
  if (!req.body.name)
    return res.status(400).send({ error: "Ticker name is missing" });
  tickers.push(req.body.name);
  return res.send({
    success: true,
    message: "Ticker added successfully",
    tickers,
  });
});

app.delete("/tickers", function (req, res) {
  if (!req.body.name)
    return res.status(400).send({ error: "Ticker name is missing" });
  const newTickers = tickers.filter((t) => t !== req.body.name);
  tickers = [...newTickers];
  return res.send({
    success: true,
    message: "Ticker removed successfully",
    tickers,
  });
});

app.get("/tickers", function (req, res) {
  return res.send({
    tickers: generateQuotes(tickers),
  });
});

app.get("/interval", function (req, res) {
  return res.send({ interval });
});

app.post("/interval", function (req, res) {
  if (!req.body.duration)
    return res.status(400).send({ error: "Interval is missing" });
  interval = req.body.duration;

  setTimer(socketServer, interval);

  return res.send({
    success: true,
    message: "Interval successfully updated",
    interval,
  });
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
