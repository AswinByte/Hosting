import { createClient } from "@libsql/client";  // ✅ Correct Turso client import

// Load environment variables
const db = createClient({
    url: process.env.TURSO_DB_URL,         // ✅ Use HTTPS URL from .env
    authToken: process.env.TURSO_AUTH_TOKEN, // ✅ Use Turso auth token
});

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ message: "Method Not Allowed. Use POST." }) 
        };
    }

    try {
        const { name, email, password } = JSON.parse(event.body);

        // ✅ Store user data in Turso database
        const result = await db.execute({
            sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            args: [name, email, password], // Store user details
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User signed up successfully!", result }),
        };
    } catch (error) {
        console.error("Database error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};
