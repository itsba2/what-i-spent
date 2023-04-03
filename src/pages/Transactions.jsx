import {
    Box,
    Tab,
    Tabs,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { Add as AddIcon, FilterAlt as FilterIcon } from "@mui/icons-material"
import { useState } from "react"
import { useAuth } from "../auth/AuthProvider"

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
        startDate: dayjs().startOf("year"),
        endDate: dayjs(),
        minAmount: "",
        maxAmount: "",
        currency: "None",
        sortKey: "date",
        sortOrder: "desc",
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
                const sortedData = filteredData.sort((a, b) => {
                    const aa = parseFloat(a[filterOptions.sortKey])
                    const bb = parseFloat(b[filterOptions.sortKey])

                    if (filterOptions.sortOrder === "desc") {
                        return aa < bb ? 1 : -1
                    } else if (filterOptions.sortOrder === "asc") {
                        return aa < bb ? -1 : 1
                    }
                })
                return {
                    filteredUserExpenses: sortedData,
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
                    data?.filter((earning) => {
                        const dateAfterStartDate = dayjs
                            .unix(earning.date)
                            .isAfter(filterOptions.startDate)
                        const dateBeforeEndDate = dayjs
                            .unix(earning.date)
                            .isBefore(filterOptions.endDate)
                        const amountLargerThanMin = filterOptions.minAmount
                            .length
                            ? parseFloat(earning.amount) >=
                              filterOptions.minAmount
                            : true
                        const amountSmallerThanMax = filterOptions.maxAmount
                            .length
                            ? parseFloat(earning.amount) <=
                              filterOptions.maxAmount
                            : true
                        const selectedCurrency =
                            filterOptions.currency === "None"
                                ? true
                                : earning.currency === filterOptions.currency
                        return (
                            dateAfterStartDate &&
                            dateBeforeEndDate &&
                            amountLargerThanMin &&
                            amountSmallerThanMax &&
                            selectedCurrency
                        )
                    }) || []
                const sortedData = filteredData.sort((a, b) => {
                    const aa = parseFloat(a[filterOptions.sortKey])
                    const bb = parseFloat(b[filterOptions.sortKey])

                    if (filterOptions.sortOrder === "desc") {
                        return aa < bb ? 1 : -1
                    } else if (filterOptions.sortOrder === "asc") {
                        return aa < bb ? -1 : 1
                    }
                })
                return {
                    filteredUserEarnings: sortedData,
                    loadingUserEarnings: isLoading,
                    userEarningsFetched: isSuccess,
                }
            },
        })

    const theme = useTheme()
    const mobileView = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <>
            {loadingUserExpenses && loadingUserEarnings && (
                <CircularProgress
                    sx={{ position: "absolute", top: "50%", left: "50%" }}
                />
            )}
            <Box width="100%" marginBottom={2}>
                <Tabs
                    centered={!mobileView && true}
                    variant={mobileView ? "fullWidth" : "standard"}
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
                    {/* <Tab
                        label="Summary"
                        {...tabProps(2)}
                    /> */}
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
                {/* <TabSummaryPanel
                    tabValue={tabValue}
                    tabIndex={2}
                /> */}
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
