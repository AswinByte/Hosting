const { createClient } = require("turso");
require("dotenv").config();

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { name, email, password } = JSON.parse(event.body);

        // Connect to Turso database
        const client = createClient(process.env.TURSO_DB_URL, process.env.TURSO_AUTH_TOKEN);

        // Insert user data into Turso database
        await client.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Signup successful!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Signup failed", error: error.message }),
        };
    }
};
