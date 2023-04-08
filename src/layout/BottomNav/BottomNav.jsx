import { Link, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Home as HomeIcon,
  ReceiptLong as TransactionsIcon,
  QueryStats as StatsIcon,
  AccountBox as AccountIcon,
} from "@mui/icons-material";

// navbar
const navLinks = [
  {
    label: "Transactions",
    route: "/transactions",
    icon: <TransactionsIcon />,
  },
  { label: "Stats", route: "/stats", icon: <StatsIcon /> },
  { label: "Account", route: "/account", icon: <AccountIcon /> },
];

const BottomNav = () => {
  const location = useLocation();
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={location.pathname.split("/")[1] || "/"}
      >
        {navLinks.map((navLink) => (
          <BottomNavigationAction
            key={navLink.label}
            LinkComponent={Link}
            to={navLink.route}
            value={navLink.route.split("/")[1] || "/"}
            label={navLink.label}
            icon={navLink.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
