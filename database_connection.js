let mongoose = require('mongoose')
async function mongoose_connection() {//establishing async mongoose connection

    let connection_result = await mongoose.connect(process.env.MONGO_URL)
    return connection_result
}

module.exports = mongoose_connection