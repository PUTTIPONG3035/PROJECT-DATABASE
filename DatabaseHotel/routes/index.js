const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  const [rows, feilds] = await pool.query('SELECT * FROM room')
  res.render('index', { rooms: (JSON.stringify(rows)) })
});


//login
router.get("/login", async function (req, res, next) {
  res.render('login', { msg: '', cus: JSON.stringify('') })
});

router.post("/login", async function (req, res, next) {
  console.log(req.body)
  const [rows, feilds] = await pool.query('SELECT email, password, customer_id FROM customers WHERE email = ? and password = ?', [req.body.email, req.body.password])
  console.log(rows)
  if (rows.length == 1) {
    res.render('login', { cus: JSON.stringify(rows) || JSON.stringify(''), msg: '' })
  }
  else {
    res.render('login', { msg: 'email และ password ผิด', cus: JSON.stringify('') })
  }
});







// edit room
// router.get("/editRoom/:data/:roomId", async function (req, res, next) {
//   // res.render('admin', { editRoom: JSON.stringify(req.params.data) })
//   res.redirect('/editRoom/:data/:roomId')
// })
router.post("/editRoom/:data/:roomId", async function (req, res, next) {
  console.log(JSON.parse(req.params.data))
  const room_type = req.params.data.split(' ')[0]
  const rppm_description = req.params.data.split(' ')[1]
  const room_service = req.params.data.split(' ')[2]
  const price = req.params.data.split(' ')[3]
  await pool.query('update room set room_type = ?, room_description = ?, room_service = ?, price = ? where room_id = ?',
    [room_type, rppm_description, room_service, price, req.params.roomId])
    console.log("asdfklasdjflkajsdfkljasdf;laskdfasdfjklasdfjklasdjfklasjdfkl")
  res.redirect('/admin#allroom')
})


//payment
router.get("/payment/:name", async function (req, res, next) {
  console.log(req.params.name.split(' '))
  res.render('payment', { name: JSON.stringify(req.params.name) })
});

router.post('/payment/:name', async function (req, res, next) {
  console.log(req.body)
  console.log(req.params.name.split(' '))
  const checkIn = req.params.name.split(' ')[0]
  const checkOut = req.params.name.split(' ')[1]
  const name = req.params.name.split(' ')[2]
  const cusId = req.params.name.split(' ')[3]
  const roomId = req.params.name.split(' ')[4]
  const price = req.params.name.split(' ')[5]
  const via = req.body.checkType
  const viaprice = req.body.number
  // console.log(req.params.name.split(' ').length)

  if (via == '') {
    res.send('wrong')
  }
  else {
    let status = ''
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    if (viaprice == '' || viaprice != price) {
      status = 'incomplete'
    }
    else {
      status = 'complete'
    }
    let p_id = 'p' + Math.floor(Math.random() * 1000)
    let b_id = 'B00' + Math.floor(Math.random() * 1000)
    try {
      const [time, feilds] = await pool.query(`SELECT NOW() as 'date' `)
      console.log(time[0].date)
      const results = await conn.query(
        "INSERT INTO payments(payment_id, via, payment_state, price, customer_id) VALUES (?, ?, ?, ?, ?)",
        [p_id, via, status, price, cusId]
      )
      // const paymentId = results[0].insertId;

      await conn.query(
        "INSERT INTO booking(booking_id, customer_id, name, room_id, check_in, check_out, price, payment_id, booking_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [b_id, cusId, name, roomId, checkIn, checkOut, price, p_id, time[0].date])

      await conn.commit()
      // res.send("sucess")
      res.redirect('/')

    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      conn.release();
    }
  }
})

//sign up
router.get("/signup", async function (req, res, next) {
  res.render('signup', { error: '' })
});

router.post("/signup", async function (req, res, next) {
  console.log(req.body)
  const { fname, lname, tel, email, password } = req.body
  // console.log("test : " + fname, lname, tel, email, password)
  console.log(email)
  const [Srows, Sfeilds] = await pool.query('SELECT email FROM  customers where email = ?', [email])
  console.log(Srows)
  if (Srows.length > 1) {
    res.render('signup', { error: 'Email ซ้ำนะไอสาส' })
  }

  else {
    const [Irows, Ifeilds] = await pool.query('INSERT INTO customers (first_name, last_name, tel, email, password) VALUES (?, ?, ?, ?, ?)', [fname, lname, tel, email, password])
    console.log(Irows)
    res.redirect('/')
  }
});

//admin
router.get("/admin", async function (req, res, next) {
  const [reports, feilds2] = await pool.query("select * from report")
  const [rooms, feilds3] = await pool.query("select * from room")
  const [roomsEdit, feilds4] = await pool.query("select * from room where room_id = 'r001'")
  res.render('admin', {
    reports: JSON.stringify(reports),
    rooms: JSON.stringify(rooms),
    editRoom: JSON.stringify(roomsEdit) })
});















//profile
router.get("/profile", async function (req, res, next) {
  res.render('profile', { folks: 'folk' })
});

//booking
router.get("/booking/:id", async function (req, res, next) {
  const roomId = req.params.id;
  console.log(roomId)
  const [rooms, feilds] = await pool.query("select * from room where room_id = ?", [roomId])

  res.render('booking', { rooms: JSON.stringify(rooms), msg: '' })
});

router.post('/booking/:id', async function (req, res, next) {
  console.log(req.params.id.split(' ')[1])
  const roomId = req.params.id.split(' ')[1]
  const [rooms, feilds] = await pool.query("select * from room where room_id = ?", [roomId])
  // console.log(req.body)
  const { checkIn, checkOut, fname } = req.body
  if (checkIn == '' || checkOut == '' || fname == '') {
    res.render('booking', { msg: 'กรุณากรอกข้อมูลให้ครบ', rooms: JSON.stringify(rooms) })    // res.redirect(`/booking/${req.params.id.split(' ')[1]}`)
  }
  else {

    if (checkIn > checkOut) {
      res.render('booking', { msg: 'กรอกเวลาผิด', rooms: JSON.stringify(rooms) })
    }
    else {
      res.redirect(`/payment/${checkIn} ${checkOut} ${fname} ${req.params.id.split(' ')[0]} ${req.params.id.split(' ')[1]} ${req.params.id.split(' ')[2]}`)
    }
  }
})

//bookingorder
router.get("/bookingOrder", async function (req, res, next) {
  const [booking_order, feilds] = await pool.query("select * from booking")
  const [booking, feilds1] = await pool.query("select * from booking join payments using(payment_id)")
  console.log(booking_order)
  res.render('booking_order', { booking_order: JSON.stringify(booking) })
});

// cancel booking order

router.get("/bookingOrder/cancel/:bookingId", async function (req, res, next) {
  await pool.query("delete from booking where booking_id = ?", [req.params.bookingId])
  res.redirect('/bookingOrder');
});


router.get("/adminlogin", async function (req, res, next) {
  res.render('adminlogin', { msg: '', emp: JSON.stringify('') })
});


//adminLogin
router.post("/adminlogin", async function (req, res, next) {
  // res.render('adminlogin', {folks : 'folk'})
  console.log(req.body)
  const [rows, feilds] = await pool.query('SELECT email, password, emp_id FROM employees WHERE email = ? and password = ?', [req.body.email, req.body.password])
  console.log(rows)
  if (rows.length == 1) {
    res.render('adminlogin', { emp: JSON.stringify(rows) || JSON.stringify(''), msg: '' })
  }
  else {
    res.render('adminlogin', { msg: 'email และ password ผิด', emp: JSON.stringify('') })
  }
});


exports.router = router;
