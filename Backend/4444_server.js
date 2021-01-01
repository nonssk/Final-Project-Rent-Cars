const express = require("express");
const app = express();
const port = 4444;
const bodyParser = require("body-parser");
const mysql = require("mysql");

// ตั้งค่าฐานข้อมูล
const DB_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "car",
};

// ตรวจ token ว่ามีสิทธิ์เข้าใช้งาน API ไหม
function verifyToken(req, res, next) {
  var token = req.headers["token"];
  if (!token) return res.send({ status: false, message: "No token" });
  if (token === "token4444") {
    next();
  } else {
    console.log("No token provided");
    return res.send({ status: false, message: "No Access." });
  }
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.listen(port, () => {
  console.log("Server Start Port : " + port);
});

// function เข้าระบบ
app.post("/login", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "SELECT id,fullname,phone,`status` FROM car.users WHERE username='"+data.username+"' AND `password`='"+data.password+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (result=="") {
      DB.end();
      res.json({ status: false });
    }else if(result!=""){
      DB.end();
      res.json({ status: true, data: result[0] });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึง รถ ที่มีสถานะ แนะนำ และ status = ว่าง
app.get("/carrec", verifyToken, function (req, res) {
  let sql = "SELECT * FROM car.car WHERE rec='true' AND status = 'ว่าง';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงค่าพื้นฐาน เช่น email address phone ที่แสดงใน ติดต่อเรา และเกี่ยวกับเรา
app.get("/getdata", verifyToken, function (req, res) {
  let sql = "SELECT * FROM car.data;";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงรถ โดยใช้ id และ สถานะเท่ากับว่าง
app.get("/getcarbyid/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT * FROM car.car WHERE id ='"+data+"' AND `status`='ว่าง';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ลบรถ ออกจากฐานข้อมูล
app.get("/deletecar/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "DELETE FROM car.car WHERE id='"+data+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงรถ โดยใช้ id
app.get("/getcarbyidadmin/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT * FROM car.car WHERE id ='"+data+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงรถทั้งหมด
app.get("/getcarall", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT * FROM car.car;";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงรถ โดยอิง status
app.get("/getcarbystatus/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT * FROM car.car WHERE `status`='"+data+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงรถ จากชนิดรถ
app.get("/getcarbytype/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT * FROM car.car WHERE type='"+data+"' AND `status`='ว่าง';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงการจอง จาก id ลูกค้า
app.get("/getdeal/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT c.*,d.address AS address,d.time AS time FROM car.deal AS d LEFT JOIN car.car AS c ON d.id_car=c.id  WHERE d.id_cus='"+data+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงการจองทั้งหมด
app.get("/getallorder", verifyToken, function (req, res) {
  let sql = "SELECT c.*,d.address AS address,d.time AS time,d.id AS config,d.statuscar AS statuscar FROM car.deal AS d LEFT JOIN car.car AS c ON d.id_car=c.id;";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงการจองจาก id
app.get("/getorderbyid/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "SELECT d.*,u.phone AS phone FROM car.deal AS d LEFT JOIN users AS u ON d.id_cus=u.id WHERE d.id='"+data+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ลบ การจองโดยใช้ id
app.get("/deleteorder/:id", verifyToken, function (req, res) {
  let data = req.params.id
  let sql = "DELETE FROM deal WHERE id='"+data+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// ดึงการจอง โดย สถานะการจอง
app.post("/getorderbystatus", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "SELECT c.*,d.address AS address,d.time AS time,d.id AS config,d.statuscar AS statuscar FROM car.deal AS d LEFT JOIN car.car AS c ON d.id_car=c.id WHERE d.statuscar='"+data.status+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true, data:result });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// เพิ่มรถ
app.post("/addcar", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "SELECT COUNT(*) AS count FROM car;";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      const DB2 = mysql.createConnection(DB_config);
      let old_id=result[0].count
      let sql2 = "INSERT INTO car SET id="+(old_id+1)+",`name`='"+data.name+"',`code`='"+data.code+"',type='"+data.type+"',price='"+data.price+"',pic='"+data.imgSrc+"',`status`='ว่าง',rec='false';";
      DB2.connect();
      DB2.query(sql2, function (errIn, result) {
        if (!errIn) {
          DB2.end();
          res.json({ status: true });
        } else {
          DB2.end();
          res.json({ status: false });
        }
      });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// เพิ่มการจอง
app.post("/addorder", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "UPDATE car SET `status`='ไม่ว่าง' WHERE id='"+data.idcar+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      const DB2 = mysql.createConnection(DB_config);
      let sql2 = "INSERT INTO car.deal SET id_cus='"+data.idcus+"',id_car='"+data.idcar+"',price='"+data.price+"',time='"+data.time+"',address='"+data.address+"',statuscar='จอง';";
      DB2.connect();
      DB2.query(sql2, function (errIn2, result) {
        if (!errIn2) {
          DB2.end();
          res.json({ status: true });
        } else {
          DB2.end();
          res.json({ status: false });
        }
      });
    } else {
      DB.end();
      res.json({ status: false });
    }
  });
});

// แก้ไขรถ
app.post("/updatecar", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "UPDATE car SET `name`='"+data.name+"',`code`='"+data.code+"',price='"+data.price+"',`status`='"+data.status+"',rec='"+data.rec+"' WHERE id="+data.id+";";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true });
    } else {
      DB.end();
      console.log(errIn);
      res.json({ status: false });
    }
  });
});

// แก้ไข การจอง
app.post("/updateorder", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "UPDATE deal SET address='"+data.address+"',time='"+data.time+"',statuscar='"+data.status+"' WHERE id='"+data.id+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      res.json({ status: true });
    } else {
      DB.end();
      console.log(errIn);
      res.json({ status: false });
    }
  });
});

// แก้ไข ข้อมูลส่วนตัว
app.post("/updateprofile", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "UPDATE users SET fullname='"+data.name+"',phone='"+data.phone+"' WHERE id='"+data.id+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (!errIn) {
      DB.end();
      const DB2 = mysql.createConnection(DB_config);
      DB2.connect();
      DB2.query("SELECT id,fullname,phone,`status` FROM car.users WHERE id='"+data.id+"';", function (errIn, result) {
        if (!errIn) {
          DB2.end();
          res.json({ status: true,data:result[0] });
        } else {
          DB2.end();
          console.log(errIn);
          res.json({ status: false });
        }
      });
    } else {
      DB.end();
      console.log(errIn);
      res.json({ status: false });
    }
  });
});

// ลงทะเบียนใช้งาน
app.post("/register", verifyToken, function (req, res) {
  let data = req.body;
  let sql = "SELECT * FROM car.users WHERE username='"+data.username+"';";
  const DB = mysql.createConnection(DB_config);
  DB.connect();
  DB.query(sql, function (errIn, result) {
    if (result=="") {
      DB.end();

      const DB2 = mysql.createConnection(DB_config);
      DB2.connect();
      DB2.query("SELECT COUNT(*) AS count FROM users;", function (errIn, result) {
        if (!errIn) {
          DB2.end();
          let old=result[0].count

          const DB3 = mysql.createConnection(DB_config);
          DB3.connect();
          DB3.query("INSERT INTO car.users SET id='"+(old+1)+"',username='"+data.username+"',`password`='"+data.password+"',fullname='"+data.fullname+"',phone='"+data.phone+"',`status`='0';", function (errIn, result) {
            if (!errIn) {
              DB3.end();
              res.json({ status: true});
            } else {
              DB3.end();
              console.log(errIn);
              res.json({ status: false , err:'ข้อมูลผิดพลาด' });
            }
          });

        } else {
          DB2.end();
          console.log(errIn);
          res.json({ status: false , err:'ข้อมูลผิดพลาด' });
        }
      });

    } else {
      DB.end();
      console.log(errIn);
      res.json({ status: false,err:"มี Username ในระบบแล้ว" });
    }
  });
});