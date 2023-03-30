import {
    Box,
    Tab,
    Tabs,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    CircularProgress,
} from "@mui/material"
import { Add as AddIcon, FilterAlt as FilterIcon } from "@mui/icons-material"
import { useMemo, useState } from "react"
import { useAuth } from "../auth/AuthProvider"

import { createSelector } from "@reduxjs/toolkit"
import { useFetchUserExpensesQuery } from "../app/services/expenseApi"
import { useFetchUserEarningsQuery } from "../app/services/earningApi"

import TabTransactionPanel from "../components/TabTransactionPanel"
import TabSummaryPanel from "../components/TabSummaryPanel"
import TransactionFilter from "../components/TransactionFilter"
import dayjs from "dayjs"

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

    const [showFilterDialog, toggleFilterDialog] = useState(false)
    const [filterOptions, setFilterOptions] = useState({
        startDate: dayjs().startOf("month"),
        endDate: dayjs().endOf("month"),
        minAmount: "",
        maxAmount: "",
        currency: currentUser.currencyPref,
    })

    // expense filters
    const { filteredUserExpenses, loadingUserExpenses, userExpensesFetched } =
        useFetchUserExpensesQuery(currentUser.id, {
            selectFromResult: ({ data, isLoading, isSuccess }) => {
                const filteredData =
                    data?.filter((expense) => {
                        const dateAfterStartDate = dayjs
                            .unix(expense.date)
                            .isAfter(filterOptions.startDate)
                        const dateBeforeEndDate = dayjs
                            .unix(expense.date)
                            .isBefore(filterOptions.endDate)
                        const amountLargerThanMin = filterOptions.minAmount
                            .length
                            ? parseFloat(expense.amount) >=
                              filterOptions.minAmount
                            : true
                        const amountSmallerThanMax = filterOptions.maxAmount
                            .length
                            ? parseFloat(expense.amount) <=
                              filterOptions.maxAmount
                            : true
                        const selectedCurrency =
                            filterOptions.currency === "None"
                                ? true
                                : expense.currency === filterOptions.currency
                        return (
                            dateAfterStartDate &&
                            dateBeforeEndDate &&
                            amountLargerThanMin &&
                            amountSmallerThanMax &&
                            selectedCurrency
                        )
                    }) || []
                return {
                    filteredUserExpenses: filteredData,
                    loadingUserExpenses: isLoading,
                    userExpensesFetched: isSuccess,
                }
            },
        })
    // earning filters
    const { filteredUserEarnings, loadingUserEarnings, userEarningsFetched } =
        useFetchUserEarningsQuery(currentUser.id, {
            selectFromResult: ({ data, isLoading, isSuccess }) => {
                const filteredData =
                    data?.filter((expense) => {
                        const dateAfterStartDate = dayjs
                            .unix(expense.date)
                            .isAfter(filterOptions.startDate)
                        const dateBeforeEndDate = dayjs
                            .unix(expense.date)
                            .isBefore(filterOptions.endDate)
                        const amountLargerThanMin = filterOptions.minAmount
                            .length
                            ? parseFloat(expense.amount) >=
                              filterOptions.minAmount
                            : true
                        const amountSmallerThanMax = filterOptions.maxAmount
                            .length
                            ? parseFloat(expense.amount) <=
                              filterOptions.maxAmount
                            : true
                        const selectedCurrency =
                            filterOptions.currency === "None"
                                ? true
                                : expense.currency === filterOptions.currency
                        return (
                            dateAfterStartDate &&
                            dateBeforeEndDate &&
                            amountLargerThanMin &&
                            amountSmallerThanMax &&
                            selectedCurrency
                        )
                    }) || []
                return {
                    filteredUserEarnings: filteredData,
                    loadingUserEarnings: isLoading,
                    userEarningsFetched: isSuccess,
                }
            },
        })

    return (
        <>
            {loadingUserExpenses && loadingUserEarnings && (
                <CircularProgress
                    sx={{ position: "absolute", top: "50%", bototm: "50%" }}
                />
            )}
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
                    transactions={filteredUserExpenses}
                    fetched={userExpensesFetched}
                    tabValue={tabValue}
                    tabIndex={0}
                />
                <TabTransactionPanel
                    transactions={filteredUserEarnings}
                    fetched={userEarningsFetched}
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
