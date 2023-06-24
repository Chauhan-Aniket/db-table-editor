import mysql from "mysql";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const {
				host,
				userName,
				password,
				databaseName,
				tableName,
				columnName,
				updatedData,
			} = req.body;

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

			// Update the SQL database with the modified data
			const updatedId = Object.keys(updatedData);
			// const updateQuery = `UPDATE ${tableName} SET ${columnName} = ${
			// 	Object.values(updatedData)[0]
			// } WHERE id = ${updatedId}`;
			const updateQuery = `UPDATE ${tableName} SET ${columnName} = ? WHERE id = ?`;
			const updateParams = [Object.values(updatedData)[0], updatedId];

			connection.query(updateQuery, updateParams, (error, result) => {
				if (error) {
					console.error(error);
					res.status(500).json({ message: "Server Error" });
				} else {
					res.send({
						message: "Data updated successfully",
					});
				}
			});

			connection.end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
