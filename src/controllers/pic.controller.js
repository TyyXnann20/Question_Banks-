const db = require("../config/db.config");
const { isEmptyOrNull } = require("../util/service");

const getList = (req, res) => {
  var sql = "SELECT * FROM pic";
  var query = req.query;

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
const create1 = (req, res) => {
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

const create = (req, res) => {
  var {
    question,
    answer,
    subject,
    lesson,
    type,
    isExam,
    level,
    image,
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
  } = req.body;

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
    "INSERT INTO questions (`Question`,`image`, `Choice1`, `Choice2`, `Choice3`, `Choice4`, `Choice5`, `Answer`, `SubjectCode`, `LessonCode`, `TypeCode`, `isExam`, `LevelCode`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    sqlInsert,
    [
      question,
      image,
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
    ],
    (error, rows) => {
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
    }
  );
};
const update = (req, res) => {
  var { id, model, description, parent_id, create_by } = req.body;
  var message = {};

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }

  var image = null;
  if (req.file.filename) {
    image = req.file?.filename;
  }

  var sql =
    "UPDATE `category` SET `model` = ?, `image` = IFNULL(?, `image`) WHERE id = ?";
  db.query(sql, [model, image, id], (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Category update success!",
      });
    }
  });
};

module.exports = {
  getList,

  create,
  update,
};
