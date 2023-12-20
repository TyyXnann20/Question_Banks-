const db = require("../config/db.config");
const { isEmptyOrNull } = require("../util/service");
const getType = (req, res) =>{
    var sql = "SELECT  DISTINCT TypeCode FROM questions;"
    db.query(sql , (error, rows) => {
      if (error) {
        res.json({
          error: true,
          message: error,
        });
      } else {
        const typeList = rows.map(row => row.TypeCode);
        res.json({
          types: typeList
        });
      }
    });
  }



  const getSubject = (req, res) =>{
    var sql = "SELECT  DISTINCT SubjectCode FROM questions;"
    db.query(sql , (error, rows) => {
      if (error) {
        res.json({
          error: true,
          message: error,
        });
      } else {
        const subjectList = rows.map(row => row.SubjectCode);
        res.json({
          subjects: subjectList
        });
      }
    });
  }



  const getLesson = (req, res) =>{
    var sql = "SELECT  DISTINCT LessonCode FROM questions;"
    db.query(sql , (error, rows) => {
      if (error) {
        res.json({
          error: true,
          message: error,
        });
      } else {
        const lessonList = rows.map(row => row.LessonCode);
        res.json({
          lessons: lessonList
        });
      }
    });
  }

module.exports = {
  getLesson,
  getSubject,
  getType
};
