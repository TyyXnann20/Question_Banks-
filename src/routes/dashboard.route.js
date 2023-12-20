const { upload } = require('../util/service')
const ctlDashboard = require("../controllers/dashboard.controller")


const Dashboard = (app) => {
    app.get("/api/dashboard/getQCM",ctlDashboard.countQcm)
    app.get("/api/dashboard/getQA",ctlDashboard.countQnA)
    app.get("/api/dashboard/getTF",ctlDashboard.countTrueFalse)
    app.get("/api/dashboard/getRecentQuestion",ctlDashboard.recentQuestion)
    app.get("/api/dashboard/getAllQuestion",ctlDashboard.countAllQuestion)
    app.get("/api/dashboard/getExam",ctlDashboard.countExam)
    app.get("/api/dashboard/graphSubject",ctlDashboard.graphSubject)

}
module.exports = Dashboard