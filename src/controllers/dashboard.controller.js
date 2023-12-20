const db = require("../config/db.config");
const { isEmptyOrNull } = require("../util/service");

const countQcm = (req, res) => {
  var sql =
    " SELECT COUNT(TypeCode) AS totalQCM FROM questions WHERE TypeCode = 'QCM' ";
  db.query(sql, (err, list) => {
    if (err) {
      res.json({
        err: true,
        message: err,
      });
    } else {
      res.json({
        list:list
      });
    }
  });
};

const countQnA = (req, res) => {
    var sql =
      " SELECT COUNT(TypeCode) AS totalQA FROM questions WHERE TypeCode = 'QnA' ";
    db.query(sql, (err, list) => {
      if (err) {
        res.json({
          err: true,
          message: err,
        });
      } else {
        res.json({
          list:list
        });
      }
    });
  };


  const countTrueFalse = (req, res) => {
    var sql =
      " SELECT COUNT(TypeCode) AS totalTF FROM questions WHERE TypeCode = 'T/F' ";
    db.query(sql, (err, list) => {
      if (err) {
        res.json({
          err: true,
          message: err,
        });
      } else {
        res.json({
          list:list
        });
      }
    });
  };

const recentQuestion = (req, res) =>{
    var sql = " SELECT Question, SubjectCode, TypeCode FROM questions ORDER BY ID DESC LIMIT 4"
    db.query(sql, (err, list) => {
        if (err) {
          res.json({
            err: true,
            message: err,
          });
        } else {
          res.json({
            list:list
          });
        }
      });
}

const countAllQuestion = (req, res) =>{
  var sql = " SELECT COUNT(*) AS total_Question FROM questions"
  db.query(sql, (err, list) => {
      if (err) {
        res.json({
          err: true,
          message: err,
        });
      } else {
        res.json({
          list:list
        });
      }
    });
}

const countExam = (req, res) =>{
  var sql = " SELECT COUNT(*) as total_Exam FROM questions WHERE isExam = 1 "
  db.query(sql, (err, list) => {
      if (err) {
        res.json({
          err: true,
          message: err,
        });
      } else {
        res.json({
          list:list
        });
      }
    });
}

const graphSubject = (req, res) =>{
  var sql = " SELECT TypeCode as code, COUNT(*) AS numOf FROM questions GROUP BY TypeCode ";
  db.query(sql,(err, list)=>{
    if(!err){
      res.json({
        list:list

      })
    }else{
      res.json({
        err:true,
        message:err
      })
    }
  })
}
module.exports = {
    countQcm,
    countQnA,
    countTrueFalse,
    recentQuestion,
    countAllQuestion,
    countExam,
    graphSubject
}