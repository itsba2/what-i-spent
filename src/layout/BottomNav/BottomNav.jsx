import { Link, useLocation } from "react-router-dom"
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material"
import { Home, Money, QueryStats, AccountBox } from "@mui/icons-material"
import { useState } from "react"

// navbar
const navLinks = [
    { label: "Home", route: "/", icon: <Home /> },
    { label: "Expenses", route: "/expenses", icon: <Money /> },
    { label: "Stats", route: "/stats", icon: <QueryStats /> },
    { label: "Account", route: "/account", icon: <AccountBox /> },
]

const BottomNav = () => {
    const location = useLocation()
    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={location.pathname}
            >
                {navLinks.map((navLink) => (
                    <BottomNavigationAction
                        key={navLink.label}
                        LinkComponent={Link}
                        to={navLink.route}
                        value={navLink.route}
                        label={navLink.label}
                        icon={navLink.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNav
