const db = require("../config/db.config");
const { isEmptyOrNull } = require("../util/service");
const officegen = require("officegen");
const fs = require("fs");

const getQuestion = (req, res) => {
  var sql = "SELECT * FROM questions";
  db.query(sql, (error, rows) => {
    if (!error) {
      res.json({
        list: rows,
        param: req.query,
      });
    } else {
      res.json({
        error: true,
        message: error,
      });
    }
  });
};

const getBYSubject = (req, res) => {
  const subject = req.body.subject;
  const type = req.body.type;
  const lesson = req.body.lesson;
  const exam = req.body.exam;
  const numberOfQuestions = req.body.numberOfQuestions;

  var sql =
    "SELECT * FROM questions WHERE SubjectCode = ? And " +
    "LessonCode = ?  AND TypeCode = ? AND isExam = ? LIMIT ?";
  db.query(
    sql,
    [subject, lesson, type, exam, numberOfQuestions],
    (error, rows) => {
      if (!error) {
        res.json({
          list: rows,
        });
      } else {
        res.json({
          error: true,
          message: error,
        });
      }
    }
  );
};

const randomQuestion = (req, res) => {
  const subject = req.body.subject;
  const type = req.body.type;
  const lesson = req.body.lesson;
  const isExam = req.body.isExam;
  const limit = req.body.limit ; // Set a default limit of 10 if not provided

  var sql =
    "SELECT * FROM questions WHERE SubjectCode = ? AND TypeCode = ? AND LessonCode = ? " +
    "  AND isExam = ? ORDER BY RAND() LIMIT ? ";
  db.query(sql, [subject, type, lesson, isExam, limit], (error, rows) => {
    if (!error) {
      res.json({
        list: rows,
      });
    } else {
      res.json({
        error: true,
        message: error,
      });
    }
  });
};

const uploadImage = (req, res) => {
  // aaaa
  res.json({
    body: req.body,
    file: req.file,
  });
};

const getType = (req, res) => {
  var sql = "SELECT  DISTINCT TypeCode FROM questions;";

  db.query(sql, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        list: rows,
      });
    }
  });
};

const getSubject = (req, res) => {
  var sql = "SELECT  DISTINCT SubjectCode FROM questions;";

  db.query(sql, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        list: rows,
      });
    }
  });
};

let exportCounter = 1;

const listToDocx = (req, res) => {
  const insertlist = req.body.insertlist;

  const docx = officegen("docx");
  const pObj = docx.createP();

  // add header row
  const headerText =
    "No.\t\t\t\tQuestion\t\t\tChoice1\t\t\tChoice2\t\t\tChoice3";
  pObj.addText(headerText, { bold: true });

  // add data rows
  insertlist.forEach((item) => {
    const rowText = `${item.ID}\t\t\t${item.Question}\t\t\t${item.Choice1}\t\t\t${item.Choice2}\t\t\t${item.Choice3}`;
    pObj.addLineBreak();
    pObj.addText(rowText);
  });

  const fileName = `questionBank${exportCounter}.docx`;
  exportCounter++;

  const out = fs.createWriteStream(fileName);
  docx.generate(out, () => {
    res.download(fileName, (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.unlinkSync(fileName);
      }
    });
  });
};

const getLesson = (req, res) => {
  var sql = "SELECT  DISTINCT LessonCode FROM questions;";

  db.query(sql, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        list: rows,
      });
    }
  });
};

const create = (req, res) => {
  var {
    question,
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    answer,
    subject,
    lesson,
    type,
    isExam,
    level,
    image,
  } = req.body;

  var params = [
    question,
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    answer,
    subject,
    lesson,
    type,
    isExam,
    level,
    image,
  ];

  var message = {};

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var image = null;
  if (req.file?.filename) {
    image = req.file?.filename;
  }

  var sqlInsert =
    "INSERT INTO questions (`Question`, `Choice1`, `Choice2`, `Choice3`, `Choice4`, `Choice5`, `Answer`, `SubjectCode`, `LessonCode`, `TypeCode`, `isExam`, `LevelCode`, `QuestionImage`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(sqlInsert, params, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Insert Completed................................!",
      });
    }
  });
};
const editQuestions = (req, res) => {
  var {
    question,
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    answer,
    subject,
    lesson,
    type,
    isExam,
    level,
    image,
    id,
  } = req.body;

  if (req.file?.filename) {
    image = req.file?.filename;
  }
  var sqlUpdate =
    " UPDATE questions SET `Question`=?, `Choice1`=?, `Choice2`=?, `Choice3`=?, " +
    "`Choice4`=?, `Choice5`=?, `Answer`=? , `SubjectCode`=?, `LessonCode`=?, " +
    " `TypeCode`=?, `isExam`=?, `LevelCode`=?, `image`=? WHERE ID=? ";

  db.query(
    sqlUpdate,
    [
      question,
      choice1,
      choice2,
      choice3,
      choice4,
      choice5,
      answer,
      subject,
      lesson,
      type,
      isExam,
      level,
      image,
      id,
    ],
    (err, result) => {
      if (err) {
        res.json({
          err: true,
          message: err,
        });
      } else {
        res.json({
          message: "Update completed....................!",
        });
      }
    }
  );
};
module.exports = {
  getQuestion,
  getBYSubject,
  randomQuestion,
  uploadImage,
  create,
  getType,
  getSubject,
  getLesson,
  listToDocx,
  editQuestions,
};
