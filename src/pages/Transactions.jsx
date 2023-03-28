import {
    Box,
    Fab,
    Tab,
    Tabs,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
} from "@mui/material"
import { Add as AddIcon, FilterAlt as FilterIcon } from "@mui/icons-material"
import { useAuth } from "../auth/AuthProvider"
import { useFetchUserExpensesQuery } from "../app/services/expenseApi"
import { useFetchUserEarningsQuery } from "../app/services/earningApi"
import { useState } from "react"
import TabTransactionPanel from "../components/TabTransactionPanel"
import TabSummaryPanel from "../components/TabSummaryPanel"
import TransactionFilter from "../components/TransactionFilter"
import Stats from "../helpers/Stats"
import Filter from "../helpers/Filter"

const actions = [
    {
        name: "Add",
        icon: <AddIcon />,
        href: "/transactions/add",
    },
    {
        name: "Filter",
        icon: <FilterIcon />,
        href: null,
    },
]

const Transactions = () => {
    const { currentUser } = useAuth()
    const [tabValue, setTabValue] = useState(0)

    const tabProps = (index) => ({
        id: `tab-${index}`,
        "aria-controls": `tabtransactionpanel-${index}`,
    })

    const {
        data: userExpenses,
        isLoading: loadingUserExpenses,
        isSuccess: userExpensesFetched,
    } = useFetchUserExpensesQuery(currentUser.id)
    const {
        data: userEarnings,
        isLoading: loadingUserEarnings,
        isSuccess: userEarningsFetched,
    } = useFetchUserEarningsQuery(currentUser.id)

    const expenseFilter = new Filter(userExpenses ?? [])

    const [showFilterDialog, toggleFilterDialog] = useState(false)
    const [filterOptions, setFilterOptions] = useState({
        startDate: null,
        endDate: null,
        amount: [expenseFilter.minAmount, expenseFilter.maxAmount],
        min: Math.floor(expenseFilter.minAmount),
        max: Math.ceil(expenseFilter.maxAmount),
    })

    return (
        <>
            <Box width="100%">
                <Tabs
                    variant="fullWidth"
                    value={tabValue}
                    onChange={(event, newTabValue) => setTabValue(newTabValue)}
                >
                    <Tab
                        label="Expenses"
                        {...tabProps(0)}
                    />
                    <Tab
                        label="Earnings"
                        {...tabProps(1)}
                    />
                    <Tab
                        label="Summary"
                        {...tabProps(2)}
                    />
                </Tabs>
                <TabTransactionPanel
                    transactions={userExpenses}
                    tabValue={tabValue}
                    tabIndex={0}
                />
                <TabTransactionPanel
                    transactions={userEarnings}
                    tabValue={tabValue}
                    tabIndex={1}
                />
                <TabSummaryPanel
                    tabValue={tabValue}
                    tabIndex={2}
                />
            </Box>
            <SpeedDial
                ariaLabel="actions"
                icon={<SpeedDialIcon />}
                sx={{
                    position: "fixed",
                    bottom: 70,
                    right: 10,
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        FabProps={{ href: action.href }}
                        onClick={
                            action.name === "Filter"
                                ? () => toggleFilterDialog((prev) => !prev)
                                : () => {}
                        }
                    />
                ))}
            </SpeedDial>
            {showFilterDialog && (
                <TransactionFilter
                    open={showFilterDialog}
                    toggle={toggleFilterDialog}
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                />
            )}
        </>
    )
}

export default Transactions
