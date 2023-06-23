import React, { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MantineProvider, useMantineTheme } from "@mantine/core";

import MOCK_DATA from "@/components/mock-data.json";

const DataTable = ({ jsonData }) => {
	const globalTheme = useMantineTheme();
	//should be memoized or stable
	const data = useMemo(
		() => (jsonData.length > 0 ? jsonData : MOCK_DATA),
		[jsonData]
	);

	const columns = useMemo(() => {
		const col = [];
		Object.keys(jsonData.length > 0 ? jsonData[0] : MOCK_DATA[0]).forEach(
			(header) =>
				col.push({
					header,
					accessorKey: header,
					Header: () => {
						return (
							<span className="mr-2 capitalize">
								{header.replace("_", " ")}
							</span>
						);
					},
					enableColumnFilterModes: true,
				})
		);
		return col;
	}, [jsonData]);

	const table = useMantineReactTable({
		data,
		columns,
		initialState: {
			showColumnFilters: false,
			// showProgressBars: true,
			// showSkeletons: true,
		},
		enableColumnFilterModes: true,
		mantinePaperProps: {
			sx: {
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				borderWidth: 0,
				borderRadius: 0,
			},
		},
		mantineTableProps: {
			// striped: true,
			sx: {
				flex: "1 1 auto",
				overflow: "scroll",
			},
		},
		mantineTableHeadProps: {
			sx: {
				position: "sticky",
				top: 0,
				left: 0,
				zIndex: 1,
			},
		},
		mantineTableHeadCellProps: {
			sx: (theme) => ({
				borderRight: `1px solid ${
					theme.colorScheme === "dark" ? "#25262b" : "#dfdfdf"
				}`,
			}),
		},
		mantineTableBodyCellProps: {
			sx: (theme) => ({
				borderRight: `1px solid ${
					theme.colorScheme === "dark" ? "#25262b" : "#dfdfdf"
				}`,
			}),
		},
	});

	return (
		<MantineProvider
			theme={{
				...globalTheme,
				primaryColor: "blue",
				colorScheme: "dark",
			}}
			withGlobalStyles
			withNormalizeCS
		>
			<MantineReactTable table={table} />
		</MantineProvider>
	);
};

export default DataTable;
