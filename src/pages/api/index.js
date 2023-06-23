import mysql from "mysql";

export default async function handler(req, res) {
	if (req.method === "GET" || req.method === "POST") {
		try {
			const { host, userName, password, databaseName, tableName } = req.body;

			// console.log(databaseName, tableName);
			// Set up the database connection using the provided table and database names
			const connection = mysql.createConnection({
				host: host,
				user: userName,
				password: password,
				database: databaseName,
			});

			// Connect to the database
			connection.connect((err) => {
				if (err) throw err;
				console.log("Connected to the database");
			});

			// Query the database for the required data
			const query = `SELECT * FROM \`${tableName}\``;
			connection.query(query, (error, results) => {
				if (error) throw error;

				// Send the retrieved data as a response
				// res.status(200).json(results);
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.setHeader("Content-Type", "application/json");
				res.send(results);
			});

			// Close the database connection
			connection.end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
