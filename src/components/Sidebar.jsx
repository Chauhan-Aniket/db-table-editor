import { useState } from "react";
import {
	Navbar,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
	rem,
} from "@mantine/core";
import {
	IconHome2,
	IconGauge,
	IconUser,
	IconSettings,
	IconLogout,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
	link: {
		width: rem(50),
		height: rem(50),
		borderRadius: theme.radius.md,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
	},

	active: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
		},
	},
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
	const { classes, cx } = useStyles();
	return (
		<Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.active]: active })}
			>
				<Icon size="1.2rem" stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
}

const mockdata = [
	{ icon: IconHome2, label: "Home" },
	{ icon: IconGauge, label: "Dashboard" },
	{ icon: IconUser, label: "Account" },
	{ icon: IconSettings, label: "Settings" },
];

const Sidebar = () => {
	const [active, setActive] = useState(2);

	const links = mockdata.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<Navbar height="100vh" width={{ base: 80 }} p="md">
			<Navbar.Section grow>
				<Stack justify="center" spacing={0}>
					{links}
				</Stack>
			</Navbar.Section>
			<Navbar.Section>
				<Stack justify="center" spacing={0}>
					<NavbarLink icon={IconLogout} label="Logout" />
				</Stack>
			</Navbar.Section>
		</Navbar>
	);
};

export default Sidebar;
