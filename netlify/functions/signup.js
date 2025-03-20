const { createClient } = require("turso");
require("dotenv").config();
exports.handler = async (event) => {
    console.log("Received request method:", event.httpMethod); // ✅ Debugging

    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ message: "Method Not Allowed. Use POST." }) 
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Signup function is working!" }),
    };
};
