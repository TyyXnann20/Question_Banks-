
const multer = require("multer")
const pig = require("../controllers/pic.controller")
const { upload } = require('../util/service')
const contrl = require("../controllers/questions.controller")
const questions = (app) => {
  app.post("/api/question/listToDocx", contrl.listToDocx);
    app.get("/api/question/getquestion",contrl.getQuestion)
    app.get("/api/question/getType",contrl.getType)
    app.get("/api/question/getSubject",contrl.getSubject)
    app.get("/api/question/getLesson",contrl.getLesson)
    app.post("/api/question/bysubject",contrl.getBYSubject)
    app.post("/api/question/randomquestion",contrl.randomQuestion)
    app.post("/api/question/upload-image",upload.single("image"),contrl.uploadImage)
  
    app.post("/api/pic/create",upload.single("image"),pig.create)
    app.get("/api/pic/get-list",pig.getList)
    app.put("/api/questions/update",upload.single("image"),contrl.editQuestions)
}
module.exports = questions