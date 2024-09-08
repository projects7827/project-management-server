// ----- LIBRARIES -----//
let dotenv = require('dotenv')
dotenv.config() //used to enabling dot env module for enabling .env data fetching
let express = require('express')
const cookieParser = require('cookie-parser');
let app = express();
// ----- ROUTES -----//
let user_router = require("./routes/user");
let project_router = require("./routes/project");
let task_router = require("./routes/task");
let authentication_router = require("./routes/authentication");

// ----- MONGOOSE CONNECTION ----- //
const mongoose_connection = require('./database_connection');

function main_code() {
    app.use(express.json())//applying body parser
    app.use(cookieParser())
    app.use("/user", user_router)
    app.use("/project", project_router)
    app.use("/task", task_router)
    app.use("/", authentication_router)

    app.listen(process.env.PORT, () => {// assigning to the port
        console.log('connected to port ' + process.env.PORT)
    })
}

mongoose_connection().then(() => {
}).catch((err) => {
    console.log(err)
})

main_code();
