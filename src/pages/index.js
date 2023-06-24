import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import InputText from "@/components/InputText";

import MOCK_DATA from "@/components/mock-data.json";

const Home = () => {
	const [host, setHost] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [tableName, setTableName] = useState("");
	const [databaseName, setDatabaseName] = useState("");
	const [jsonData, setJsonData] = useState(MOCK_DATA);

	const fetchData = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("/api", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": ["*"],
					"Access-Control-Allow-Headers": "Content-Type",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					host,
					userName,
					password,
					databaseName,
					tableName,
				}),
			});

			if (response.ok) {
				const jsonData = await response.json();
				setJsonData(jsonData);

				console.log(jsonData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	console.log(jsonData[0]);
	const handleSaveCell = async (cell, value) => {
		const newJsonData = jsonData.length > 0 ? [...jsonData] : [...MOCK_DATA];

		newJsonData[cell.row.index][cell.column.id] = value;

		setJsonData(newJsonData);

		const updatedData = {
			[newJsonData[cell.row.index].id]: value,
		};

		try {
			// Send the updated data to the API for updating the SQL database
			const response = await fetch("/api/update", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": ["*"],
					"Access-Control-Allow-Headers": "Content-Type",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					host,
					userName,
					password,
					databaseName,
					tableName,
					columnName: cell.column.id,
					updatedData,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				console.error("Failed to update data in the SQL database");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main
			className={`dark relative h-screen w-full flex bg-zinc-50 dark:bg-zinc-900`}
		>
			<form
				onSubmit={fetchData}
				className="w-fit p-4 flex flex-col justify-between text-zinc-900 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800"
			>
				<div className="w-full flex flex-col gap-6">
					<InputText
						id="host"
						value={host}
						handleChange={(e) => setHost(e.target.value)}
					>
						Host
						<span className="text-zinc-400 float-right">IP | URL</span>
					</InputText>
					<InputText
						id={"username"}
						value={userName}
						handleChange={(e) => setUserName(e.target.value)}
					>
						Username
					</InputText>
					<InputText
						id={"password"}
						value={password}
						handleChange={(e) => setPassword(e.target.value)}
					>
						Password
					</InputText>
					<hr className="border-zinc-200 dark:border-zinc-800" />
					<InputText
						id="database name"
						value={databaseName}
						handleChange={(e) => setDatabaseName(e.target.value)}
					>
						Database Name
					</InputText>
					<InputText
						id="table name"
						value={tableName}
						handleChange={(e) => setTableName(e.target.value)}
					>
						Table Name
					</InputText>
				</div>
				<button
					type="submit"
					className="p-2.5 px-6 text-white bg-blue-700 text-xs font-medium tracking-wide rounded"
				>
					Fetch Data
				</button>
			</form>

			{/* <div className="p-4 h-screen w-full dark:bg-zinc-900 grow"> */}
			<DataTable jsonData={jsonData} handleSaveCell={handleSaveCell} />
			{/* </div> */}
		</main>
	);
};

export default Home;
