const express = require("express");
var multer = require('multer');
const router = express.Router();
const bcrypt = require("bcryptjs")
const moment = require("moment");
// mysql connection

const stripe = require("stripe")("sk_test_51IPvrnIAaIJ9dA25lOk4dDB0RRLvkDYb1LF9pITxtcl67oiVpoHA3tycYgnUn01SDHmg8VAIzhOUaDfxV7JpMN4X00Odeh68UU");
const mysql = require('mysql');
const host = 'localhost';
const user = 'root';
const password = '';
const database = 'brainaly';

function runQuery(query1){
  return new Promise(resolve => {
         
    setTimeout(() => {
      var resultData = '';
        con.query(query1, (err, result) => {
          if(err) throw err;
          resultData = result
          resolve(resultData);
        });
    }, 100);
  });
}

const con = mysql.createConnection({
  host,
  user,
  password,
  database,
});

const {
  getTotalQuiaNum
} = require("./helper");

con.connect();
var saltRounds = 10;
var limitNum = 3;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')
//====== Image upload
router.post("/upload", async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
  return res.status(200).send(req.file)
  })
})

// ======= Update quiz

router.post("/updatequiz", async (req, res) => {
  console.log(req.body.id);
  const query = "UPDATE `questions` SET `q_content`='"+req.body.data+"' WHERE `q_uid` = '"+req.body.id+"'";
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: result,
      message: 'success'
    })
  });
});

router.post("/getbyid", async (req, res) => {
  console.log(req.body)
  const query = "SELECT * FROM `questions` WHERE q_uid = '"+req.body.id+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
})

router.post("/deletequiz", async (req, res) => {
  console.log(req.body)
  const query = "DELETE FROM `questions` WHERE `q_uid` = '"+req.body.uid+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
})

//============ Insert new quiz
router.post("/newquiz", async (req, res) => {
  console.log(req.body);
  const query = "INSERT INTO `questions` (`q_uid`, `q_name`, `q_description`, `q_content`, `q_cover`, `q_user_id`) VALUES  ('" + req.body.uid + "', '" + req.body.title + "', '" + req.body.description + "', '"+req.body.content+ "', '"+req.body.cover+"', '"+req.body.userid+"'); ";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      flag: true,
      data: {
        uid: req.body.uid,
      },
      msg: "Contratulation! Create new Quiz is Success"
    })
    res.send();
  });
})

// ================user sign up api
router.post("/signup", async (req, res) => {
  var userEmail = req.body.userEmail;
  var userName = req.body.userName;
  var userPwd = req.body.userPwd;
  var userType = req.body.userType;
  console.log(req.body)
  const query1 = "select * from users where u_email = '" + userEmail + "'";

  console.log("userSign up")
  var flag = false
  res.setHeader('Content-Type', 'text/html');
  await con.query(query1, (err, result, fields) => {
    if (err) throw err;
    if (result.length) {
      flag = true
      res.json({
        flag: false,
        data: "",
        msg: "Email Already Exist!"
      })
      res.send();
      
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw err
        } else {
          bcrypt.hash(userPwd, salt, function (err, hash) {
            if (err) {
              throw err
            } else {
              //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
              const query1 = "INSERT INTO `users` (`u_name`, `u_email`, `u_pwd`, `u_type`) VALUES ('" + userName + "', '" + userEmail + "', '" + hash + "', '"+userType+"'); ";
              con.query(query1, (err, result, fields) => {
                if (err) throw err;
                res.json({
                  flag: true,
                  data: {
                    userName: userName,
                    userEmail: userEmail,
                    token: hash
                  },
                  msg: "Contratulation! Sign Up is Success"
                })
                res.send();
              });
            }
          })
        }
      })
    }
  });
});

router.post("/signin", async (req, res) => {
  var userEmail = req.body.userEmail;
  var userPwd = req.body.userPwd;
  const query1 = "select * from users where u_email = '" + userEmail + "'";
  res.setHeader('Content-Type', 'text/html');
  await con.query(query1, (err, result, fields) => {
    console.log(result[0].u_pwd, userPwd, "when user signin", result)
    if (err) throw err;
    if (result.length) {
      bcrypt.compare(userPwd, result[0].u_pwd, function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          res.json({
            flag: false,
            data: "",
            msg: "Email or Password is incorrect!"
          })
          res.send();
        } else {
          res.json({
            flag: true,
            data: result[0],
            msg: "Login Success!"
          });
          res.send();
        }
      })
      
      
    } else {
      res.json({
        flag: false,
        data: "",
        msg: "Email or Password is incorrect!"
      })
      res.send();
    }
  });
});

router.post("/getquizlist", async (req, res) => {
  const query = "SELECT * FROM `questions` WHERE q_user_id = '"+req.body.userid+"' LIMIT "+limitNum+" OFFSET 0";
  var totalNum = 0;
 
  await con.query("SELECT * FROM `questions` WHERE q_user_id = '"+req.body.userid+"'", (err, result, fields) => {
    if (err) throw err;
    console.log(result.length)
    totalNum = result.length
  });

  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      result,
      msg: "fetch success",
      total: totalNum
    })
    res.send();
  });
});

router.post("/getquizpage", async (req, res) => {
  var pageNum = req.body.pageNum - 1; 
  if(pageNum < 0 ){
    pageNum = 0
  }
  console.log(req.body, pageNum)
  const query = "SELECT * FROM `questions`  WHERE q_user_id = '"+req.body.userid+"' LIMIT "+limitNum+" OFFSET "+pageNum * limitNum;
  var totalNum = 0;
 
  await con.query("SELECT * FROM `questions`  WHERE q_user_id = '"+req.body.userid+"'", (err, result, fields) => {
    if (err) throw err;
    console.log(result.length)
    totalNum = result.length
  });

  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      result,
      msg: "fetch success",
      total: totalNum
    })
    res.send();
  });
});

router.post("/getbyid", async (req, res) => {
  console.log(req.body)
  const query = "SELECT * FROM `questions` WHERE q_uid = '"+req.body.id+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
});

// ===========  Collection functions

router.post("/newcollection", async (req, res) => {
  console.log(req.body);
  const query = "INSERT INTO `collections` (`col_uid`, `col_name`, `col_description`, `col_image`, `col_quiz`, `col_user_id`) VALUES  ('" + req.body.uid + "', '" + req.body.title + "', '" + req.body.description + "', '"+req.body.cover+"', '" + req.body.quiz+ "', '" + req.body.userid + "'); ";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      flag: true,
      data: {
        uid: req.body.uid,
      },
      msg: "Contratulation! Create new Quiz is Success"
    })
    res.send();
  });
});

router.post("/deleteCol", async (req, res) => {
  console.log(req.body)
  const query = "DELETE FROM `collections` WHERE `col_uid` = '"+req.body.colId+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
})

router.post("/getcollist", async (req, res) => {
  const query = "SELECT * FROM `collections` WHERE col_user_id = '"+req.body.userid+"' LIMIT "+limitNum+" OFFSET 0";
  var totalNum = 0;

  await con.query("SELECT * FROM `collections` WHERE col_user_id = '"+req.body.userid+"'", (err, result, fields) => {
    if (err) throw err;
    console.log(result.length)
    totalNum = result.length
  });

  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      result,
      msg: "fetch success",
      total: totalNum
    })
    res.send();
  });
});

router.post("/getcolpage", async (req, res) => {
  var pageNum = req.body.pageNum - 1; 
  if(pageNum < 0 ){
    pageNum = 0
  }
  var offset = pageNum * limitNum;

  const query = "SELECT * FROM `collections` WHERE col_user_id = '"+req.body.userid+"' LIMIT "+limitNum+" OFFSET "+offset;
  var totalNum = 0;

  await con.query("SELECT * FROM `collections` WHERE col_user_id = '"+req.body.userid+"'", (err, result, fields) => {
    if (err) throw err;
    console.log(result.length)
    totalNum = result.length
  });

  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      result,
      msg: "fetch success",
      total: totalNum
    })
    res.send();
  });
});
router.post("/getcolbyid", async (req, res) => {
  console.log(req.body)
  const query = "SELECT * FROM `collections` WHERE col_uid = '"+req.body.id+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
});
router.post("/updatecol", async (req, res) => {
  console.log(req.body);
  let addText = '';
  if(req.body.cover===null || req.body.cover === ''){
    addText = '';
  } else {
    addText = ", `col_image`= '"+ req.body.cover+"'";
  }
  const query = "UPDATE `collections` SET `col_name`='"+req.body.title+"', `col_description`='"+req.body.description+"'"+addText+" WHERE `col_uid` = '"+req.body.uid+"'";
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: result,
      message: 'success'
    })
  });
});
router.post("/updatequizlist", async (req, res) => {
  console.log(req.body);
  const query = "UPDATE `collections` SET `col_quiz`='"+req.body.quiz+"' WHERE `col_uid` = '"+req.body.uid+"'";
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: result,
      message: 'success'
    })
  });
});

// Class
router.post("/newclass", async (req, res) => {
  console.log(req.body);
  const query = "INSERT INTO `classes` (`cl_uid`, `cl_cover`, `cl_name`, `cl_description`, `cl_user_id`, `cl_students`) VALUES  ('" + req.body.uid + "', '" + req.body.cover + "', '" + req.body.title + "', '"+req.body.description+"', '" + req.body.userid+"', '" + req.body.students+ "'); ";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    res.json({
      flag: true,
      data: {
        uid: req.body.uid,
      },
      msg: "Contratulation! Create new Quiz is Success"
    })
    res.send();
  });
});

router.post("/deleteclass", async (req, res) => {
  console.log(req.body)
  const query = "DELETE FROM `classes` WHERE `cl_uid` = '"+req.body.cls_uid+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
})
router.post("/getclasslist", async (req, res) => {
  var totalNum = 0;
  var pageNum = req.body.pageNum - 1; 
  if(pageNum < 0 ){
    pageNum = 0
  }
  var query = "";
  var queryTotal = "";
  console.log(req.body.userType);
  if(req.body.userType == 'student'){
    query = "SELECT * FROM `classes` LIMIT "+limitNum+" OFFSET "+limitNum * pageNum;
    queryTotal = "SELECT * FROM `classes`";
  } else {
    query = "SELECT * FROM `classes` WHERE cl_user_id = '"+req.body.userid+"' LIMIT "+limitNum+" OFFSET "+limitNum * pageNum;
    queryTotal = "SELECT * FROM `classes` WHERE cl_user_id = '"+req.body.userid+"'";
  }
  
  await con.query(queryTotal, (err, result, fields) => {
    if (err) throw err;
    console.log(result.length)
    totalNum = result.length
  });

  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      result,
      total: totalNum
    })
  })
});

router.post("/joinmem", async (req, res) => {
  // cls_id: classId,
  //     join_flag: joinFlag,
  //     pageNum: cPageNum
  var query = "SELECT * FROM `classes` WHERE `cl_uid`='"+req.body.cls_id+"'";
  var result = await runQuery(query);
  var students = JSON.parse(result[0].cl_students);
  if(students.indexOf(req.body.u_id) >= 0){
    // remove student from class
    students.pop(students.indexOf(req.body.u_id));
  } else {
    students.push(req.body.u_id);
  }

  query = "UPDATE `classes` SET `cl_students`='"+JSON.stringify(students)+"' WHERE `cl_uid` = '"+req.body.cls_id+"'";
  await runQuery(query);

  var totalNum = 0;
  var pageNum = req.body.pageNum - 1; 
  if(pageNum < 0 ){
    pageNum = 0
  }

  var query = "";
  var queryTotal = "";
  
  query = "SELECT * FROM `classes` LIMIT "+limitNum+" OFFSET "+limitNum * pageNum;
  queryTotal = "SELECT * FROM `classes`";
  
  await con.query(queryTotal, (err, result, fields) => {
    if (err) throw err;
    console.log(result.length)
    totalNum = result.length
  });

  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      result,
      total: totalNum
    })
  })
});

router.post("/getclassbyid", async (req, res) => {
  console.log(req.body)
  const query = "SELECT * FROM `classes` WHERE cl_uid = '"+req.body.id+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
});
router.post("/updateclass", async (req, res) => {
  console.log(req.body);
  let addText = '';
  if(req.body.cover===null || req.body.cover === ''){
    addText = '';
  } else {
    addText = ", `cl_cover`= '"+ req.body.cover+"'";
  }
  const query = "UPDATE `classes` SET `cl_name`='"+req.body.title+"', `cl_description`='"+req.body.description+"'"+ addText + " WHERE `cl_uid` = '"+req.body.uid+"'";
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: result,
      message: 'success'
    })
  });
});
router.post("/getstubyid", async (req, res) => {
  console.log(req.body)
  const query = "SELECT * FROM `users` WHERE u_id = '"+req.body.id+"'";
  await con.query(query, (err, result, fields) => {
    if(err) throw err;
    console.log(result)
    res.json({
      data: result
    })
  })
});

//Profile

router.post("/updateprofile", async (req, res) => {
  const query = "UPDATE `users` SET `u_name` = '"+req.body.userName+"',  `u_birthday` = '"+req.body.user_birth+"',  `u_email` = '"+req.body.userEmail+"', `u_school` = '"+req.body.userSchool+"',  `u_avatar` = '"+req.body.userAvatar+"', `u_phonenumber` = '"+req.body.userPhone+"' WHERE `u_id` = "+req.body.userId;
  console.log(query);
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: result,
      message: 'success'
    })
  });
});


// chats
router.post("/getusers", async (req, res) => {
  const query = "SELECT * FROM users WHERE u_id != '"+req.body.userId+"';";
  var users = '';
  var resultData = [];

  await con.query(query, async (err, result) => {
    if(err) throw err;

    users = result;
    
    for(var i = 0; i < users.length; i++){
      const query1 = "SELECT * FROM chats WHERE m_from_id = "+users[i].u_id+" AND m_to_id = "+req.body.userId+" AND m_read_at = ''";
      await callBackFnc(query1, i);
    }

    function callBackFnc(query1, i){
      return new Promise(resolve => {
        setTimeout(() => {
          con.query(query1, (err, result) => {
            if(err) throw err;
            resultData.push({
              ...users[i],
              newMsgNum: result.length
            })
          });
          resolve(resultData);
        }, 100);
      });
    }
    setTimeout(()=>{
      res.json({
        data: resultData,
        message: 'success'
      })
    }, 350);
  });
});

router.post("/getmessage", async (req, res) => {
  const query = "SELECT * FROM chats WHERE (m_from_id = "+req.body.userId+" AND m_to_id = "+req.body.client_id+") OR (m_to_id = "+req.body.userId+" AND m_from_id = "+req.body.client_id+")";
  console.log(query);
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: result,
      message: 'success'
    })
  });
});

router.post("/readmesage", async (req, res) => {
  const query = "UPDATE `chats` SET `m_read_at`= '"+moment().format()+"' WHERE `m_from_id` = '"+req.body.from_id+"' AND "+ "`m_to_id` = "+req.body.to_id ;
  console.log(query);
  await con.query(query, (err, result) => {
    if(err) throw err;
    res.json({
      data: req.body.from_id,
      message: 'success'
    })
  });
});

const calculateOrderAmount = (payType, userType) => {
  if(payType == 'standard'){
    if(userType = 'teacher') {
      return 1000;
    } else {
      return 500;
    }
  } else {
    if(userType = 'teacher') {
      return 1500;
    } else {
      return 1000;
    }
  }
};

router.post("/membershipUpgrade", async (req, res) => {

  var amount = calculateOrderAmount(req.body.payType, req.body.userType);
  function callBackFnc(query1){
    return new Promise(resolve => {
           
      setTimeout(() => {
        var resultData = '';
          con.query(query1, (err, result) => {
            if(err) throw err;
            resultData = result
            resolve(resultData);
          });
      }, 100);
    });
  }

  stripe.customers.create({
    email: req.body.userEmail,
   source: req.body.token.id,
 })
 .then(customer =>
   stripe.charges.create({
     amount,
     description: req.body.payType+" membership upgrade from "+ req.body.userName,
        currency: "usd",
        customer: customer.id
   }))
 .then(async charge => {
  var eNow = new Date();
  eNow.setMonth(eNow.getMonth()+1);
  var eMoment = moment(eNow);
  var query1 = "UPDATE `users` SET `u_membership_type`='"+req.body.payType+"', `u_expire_date`='"+eMoment.format()+"'   WHERE `u_id` = '"+req.body.userId+"'";

  await callBackFnc(query1);
  var query = "SELECT * FROM `users` WHERE `u_id` = '"+req.body.userId+"'";
  var userResult = await callBackFnc(query);
  console.log(userResult);
  res.json({ err: null, msg: 'Your Membership is Upgraded', userInfo: userResult[0] })
 }).catch((err)=>{
   console.log(err)
  res.json({ err: err, msg: "There was a error, Please check your CardInfo Or contact Admin!"});
 });
});

module.exports = router;