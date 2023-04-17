const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  const [rows, feilds] = await pool.query('SELECT * FROM room')
  res.render('index', { rooms: JSON.stringify(rows) })
});

router.get("/login", async function (req, res, next) {
  res.render('login', {msg : '', cus : JSON.stringify('')})
});

router.post("/login", async function (req, res, next) {
  console.log(req.body)
 const [rows, feilds] = await pool.query('SELECT email, password, customer_id FROM customers WHERE email = ? and password = ?', [req.body.email, req.body.password])
 console.log(rows)
 if(rows.length == 1){

   res.render('login', {cus : JSON.stringify(rows) || JSON.stringify(''), msg : ''})



 }
 else{
   res.render('login', {msg : 'email และ password ผิด', cus : JSON.stringify('')})

 }
});

router.get("/payment", async function (req, res, next) {
  res.render('payment', { folks: 'folk' })
});


router.get("/signup", async function (req, res, next) {
  res.render('signup', {error : ''})
});

router.post("/signup", async function (req, res, next) {
  console.log(req.body)
  // const fname = req.body.fname
  // const lname = req.body.lname
  // const tel = req.body.tel
  // const email = req.body.email
  // const password = req.body.password
  const {fname, lname, tel, email, password} = req.body
  // console.log("test : " + fname, lname, tel, email, password)
  console.log(email)
  const [Srows, Sfeilds] = await pool.query('SELECT email FROM  customers where email = ?', [email])
  console.log(Srows)
  if(Srows.length > 1){
    res.render('signup', {error : 'Email ซ้ำนะไอสาส'})
  }

  else{
    const [Irows, Ifeilds] = await pool.query('INSERT INTO customers (first_name, last_name, tel, email, password) VALUES (?, ?, ?, ?, ?)', [fname, lname, tel, email, password])
    console.log(Irows)
    res.redirect('/')
  }
});


router.get("/admin", async function (req, res, next) {
  const [reports, feilds2] = await pool.query("select * from report")
  const [rooms, feilds3] = await pool.query("select * from room")
  res.render('admin', { reports: JSON.stringify(reports), rooms : rooms })
});

router.get("/profile", async function (req, res, next) {
  res.render('profile', { folks: 'folk' })
});

router.get("/booking", async function (req, res, next) {
  res.render('booking', { folks: 'folk' })
});

router.get("/bookingOrder", async function (req, res, next) {
  res.render('booking_order', { folks: 'folk' })
});

router.get("/adminlogin", async function (req, res, next) {
  res.render('adminlogin', {msg : '', emp : JSON.stringify('')})
});

router.post("/adminlogin", async function (req, res, next) {
  // res.render('adminlogin', {folks : 'folk'})
  console.log(req.body)
  const [rows, feilds] = await pool.query('SELECT email, password, emp_id FROM employees WHERE email = ? and password = ?', [req.body.email, req.body.password])
  console.log(rows)
  if(rows.length == 1){
    res.render('adminlogin', {emp : JSON.stringify(rows) || JSON.stringify(''), msg : ''})
  }
  else{
    res.render('adminlogin', {msg : 'email และ password ผิด', emp : JSON.stringify('')})
  }
});


exports.router = router;
