// let project_model = require("./routes/project");
// let task_model = require("./routes/task");


function generate_random_number() {
    return Math.round(Math.random() * 100000)
}

async function update_document(input_query, update_data, model_instance) {//used to update document
    try {
        let response = await model_instance.updateOne(input_query, update_data)
        return response.status(200).send({ "status": "success" })
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

async function assign_data(user_data = { "user_id": "", "user_name": "", "user_image": "" }, project_id, model_instance) {
    try {
        let response = await get_user_projects({ id: user_data.user_id });
        if (response.length && response.length > 0) {
            return { "message": "project already assigned to user" }
        }
        else {
            response['assigned_to'].push({ "id": user_data.user_id, "name": user_data.user_name, "image": user_data.user_image })
            update_document({ "id": project_id }, response, model_instance)
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function add_document(add_data, model_instance) {
    try {
        let response = await model_instance.insertMany(add_data, model_instance)
        return response
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}


async function find_document(search_input, model_instance) {
    try {
        let response = await model_instance.findOne(search_input);
        return response;
    } catch (error) {
        console.log("Error finding document:", error);
        throw error;
    }
}



async function get_user_projects(data) {
    let result;
    if (data.id !== undefined) {
        result = { "assigned_to": data.id }
    }
    try {
        let response = await project_model.aggregate([{ $unwind: "$assigned_to" }, { $match: result }])
        return response;
    } catch (error) {
        console.log("Error finding document:", error);
        throw error;
    }

}
async function get_user_tasks(data) {
    let result;
    if (data.id !== undefined) {
        result = { "assigned_to": data.id }
    }
    try {
        let response = await task_model.aggregate([{ $unwind: "$assigned_to" }, { $match: result }])
        return response;
    } catch (error) {
        console.log("Error finding document:", error);
        throw error;
    }

}



module.exports = { add_document, generate_random_number, find_document, get_user_tasks, get_user_projects, assign_data, update_document }
