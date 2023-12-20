
const multer = require("multer")
const pig = require("../controllers/pic.controller")
const { upload } = require('../util/service')
const contrl = require("../controllers/dropdown.controller")
const dropdown = (app) => {
  
    app.get("/api/dropdown/getType",contrl.getType)
    app.get("/api/dropdown/getSubject",contrl.getSubject)
    app.get("/api/dropdown/getLesson",contrl.getLesson)
    
}
module.exports = dropdown