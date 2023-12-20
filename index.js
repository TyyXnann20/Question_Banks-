const express = require("express")
const app = express()
const cors = require("cors")
const bodyPaser = require("body-parser")
app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))
app.use(cors({origin : "*"}))


app.get("/",(req,res)=>{
    res.send("Hello api")
}) 


// require("./src/routes/customer.route")(app)
// require("./src/routes/register.route")(app)
require("./src/routes/questions.route")(app)
require("./src/routes/dropdown.route")(app)
require("./src/routes/dashboard.route")(app)
const port = 8070
app.listen(port,()=>{
    console.log("running http://localhost:"+port)
    // console.log(`http://localhost:${port}`)
})
