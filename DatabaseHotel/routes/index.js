const express = require("express");
// const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  res.render('index', {folk : 'folk'})
});

router.get("/login", async function (req, res, next) {
  res.render('login', {folks : 'folk'})
});

router.get("/payment", async function (req, res, next) {
  res.render('payment', {folks : 'folk'})
});


router.get("/signup", async function (req, res, next) {
  res.render('signup', {folks : 'folk'})
});


router.get("/admin", async function (req, res, next) {
  res.render('admin', {folks : 'folk'})
});


router.get("/admin", async function (req, res, next) {
  res.render('admin', {folks : 'folk'})
});

router.get("/profile", async function (req, res, next) {
  res.render('profile', {folks : 'folk'})
});

router.get("/booking", async function (req, res, next) {
  res.render('booking', {folks : 'folk'})
});

router.get("/bookingOrder", async function (req, res, next) {
  res.render('booking_order', {folks : 'folk'})
});

router.get("/adminlogin", async function (req, res, next) {
  res.render('adminlogin', {folks : 'folk'})
});


exports.router = router;
