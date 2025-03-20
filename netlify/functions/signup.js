const { createClient } = require("turso");
require("dotenv").config();

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed. Use POST." }) };
    }

    try {
        const { name, email, password } = JSON.parse(event.body);
        console.log("Received data:", { name, email });

        // ✅ Step 1: Connect to Turso Database
        const client = createClient(process.env.TURSO_DB_URL, process.env.TURSO_AUTH_TOKEN);
        console.log("Connected to Turso");

        // ✅ Step 2: Insert user data into database
        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        await client.execute(query, [name, email, password]);

        console.log("User inserted successfully!");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Signup successful!" }),
        };
    } catch (error) {
        console.error("Signup error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Signup failed", error: error.message }),
        };
    }
};
