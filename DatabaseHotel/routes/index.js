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
  res.render('payment', { name : JSON.stringify(req.params.name), check : JSON.stringify(''), done : null})
});

router.post('/payment/:name', async function (req, res, next) {
  console.log('ค่าที่ส่งมา:' + req.params.name)
  // console.log(req.params.name.split(' '))
  const checkIn = req.params.name.split(' ')[0]
  const checkOut = req.params.name.split(' ')[1]
  const name = req.params.name.split(' ')[2]
  const cusId = req.params.name.split(' ')[3]
  const roomId = req.params.name.split(' ')[4]
  const price = req.params.name.split(' ')[5]
  const via = req.body.checkType
  const viaprice = req.body.number
  const allprice = req.params.name.split(' ')[6]
  console.log(price)
    // console.log(req.params.name.split(' ').length)
      if(via == null ){
          res.send('wrong')
      }
      else{
        let status = ''
        const conn = await pool.getConnection()
        // Begin transaction
        await conn.beginTransaction();
        if(viaprice == '' || viaprice != allprice){
          status = 'incomplete'
       }
       else{
        status = 'complete'
      }
      console.log(status)
       let p_id = 'p' + Math.floor(Math.random() * 1000)
       let b_id = 'B00' + Math.floor(Math.random() * 1000)
        try {
          const [time, feilds] = await pool.query(`SELECT NOW() as 'date' `)
          console.log(time[0].date)
          await conn.query(
            "INSERT INTO payments(payment_id, via, payment_state, price, customer_id) VALUES (?, ?, ?, ?, ?)",
            [p_id,via,  status, price, cusId]
          )
          // const paymentId = results[0].insertId;
      
          await conn.query(
            "INSERT INTO booking(booking_id, customer_id, name, room_id, check_in, check_out, price, payment_id, booking_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [b_id, cusId, name, roomId, checkIn, checkOut, allprice, p_id, time[0].date])
      
          await conn.commit()
          // console.log(conn)
          // res.send("sucess")
          res.render(`payment`, {check : JSON.stringify('success'), name : JSON.stringify(''), done : true})
          // res.redirect('/')
        
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
  if (Srows.length > 0) {
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
router.get("/profile/:id", async function (req, res, next) {
  console.log(req.params.id)
  const [booking, feilds] = await pool.query('SELECT * FROM booking join room using(room_id) join customers c using(customer_id) join payments using(payment_id) WHERE c.customer_id = ?', [req.params.id])
  console.log(booking)
  if(booking == ''){
    const [yesbooking, feild1] = await pool.query('SELECT customer_id FROM booking WHERE ? in (customer_id)', [booking.customer_id])
    const [nobooking, feild2] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [req.params.id])
    console.log(nobooking)
    console.log(yesbooking)
    res.render('profile', {booking : JSON.stringify(nobooking), yesbooking : JSON.stringify(yesbooking)})
  }
  else{
    console.log('booking')
    res.render('profile', { booking : JSON.stringify(booking), yesbooking : JSON.stringify('check') })
  }
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
  const{checkIn, checkOut, fname} = req.body
  const [rooms, feilds] = await pool.query("select * from room where room_id = ?", [roomId])


  // console.log(req.body)
  

  if(checkIn == '' || checkOut == '' || fname == ''){
    res.render('booking', {msg : 'กรุณากรอกข้อมูลให้ครบ', rooms : JSON.stringify(rooms)})    // res.redirect(`/booking/${req.params.id.split(' ')[1]}`)
  }
  else{
    const [vacancy, feild1] = await pool.query('select * from booking where ( ? between check_in and  check_out or ? between  check_in and check_out) and room_id = ? ', [checkIn, checkOut, roomId])
    const [unavailabel, feild2] = await pool.query("select * from unavilable_room where (date = ? or date = ?) and  room_id = ?", [checkIn, checkOut, roomId])
    console.log('vacancy : ' + vacancy.length)
    console.log('unvailabel : ' + unavailabel.length)
    if(checkIn > checkOut){
       res.render('booking', {msg : 'กรอกเวลาผิด', rooms : JSON.stringify(rooms)})
    }

    else if(vacancy.length > 0){
      res.render('booking', {msg: 'ห้องเต็ม', rooms : JSON.stringify(rooms) })
    }

    else if(unavailabel.length > 0){
      res.render('booking', {msg: 'ห้องยังไม่พร้อมให้ใช้งาน', rooms : JSON.stringify(rooms) })
    }

    else{
      const [countRooms, feild1] = await pool.query('SELECT DATEDIFF( ? , ?) AS date', [checkOut, checkIn])
      console.log(countRooms)
      const allprice = parseInt(req.params.id.split(' ')[2]) * parseInt(countRooms[0].date)
      console.log('allprice : ' + allprice)
      // res.render('payment', {allprice : allprice})
      res.redirect(`/payment/${checkIn} ${checkOut} ${fname} ${req.params.id.split(' ')[0]} ${req.params.id.split(' ')[1]} ${req.params.id.split(' ')[2]} ${allprice}`)
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

router.get("/profile/delete/:bookingId", async function (req, res, next){
  console.log(req.params.bookingId.split(' ')[0])

  // confirm('Press a button')
  try{
    const[deleteRoom, feild] = await pool.query('DELETE FROM booking WHERE booking_id = ?', [req.params.bookingId.split(' ')[0]])
    // res.render('profile', {booking : JSON.stringify(booking), yesbooking : JSON.stringify('check') })
    res.redirect(`/profile/${req.params.bookingId.split(' ')[1]}`)
  }catch(err){
    console.log(err)
  }
})


exports.router = router;
