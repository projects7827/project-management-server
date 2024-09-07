function generate_random_number() {

    return Math.round(Math.random() * 100000)

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

module.exports = { generate_random_number, find_document }
