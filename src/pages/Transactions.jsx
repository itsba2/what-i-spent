import { Box, Fab, Tab, Tabs } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { useAuth } from "../auth/AuthProvider"
import { useFetchUserExpensesQuery } from "../app/services/expenseApi"
import { useFetchUserEarningsQuery } from "../app/services/earningApi"
import { useState } from "react"
import TabPanel from "../components/TabPanel"

const Transactions = () => {
    const { currentUser } = useAuth()
    const [tabValue, setTabValue] = useState(0)

    const tabProps = (index) => ({
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
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

    return (
        <>
            <Box width="100%">
                <Tabs
                    // centered
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
                <TabPanel
                    transactions={userExpenses}
                    tabValue={tabValue}
                    tabIndex={0}
                />
                <TabPanel
                    transactions={userEarnings}
                    tabValue={tabValue}
                    tabIndex={1}
                />
                <TabPanel
                    transactions={[]}
                    tabValue={tabValue}
                    tabIndex={2}
                />
            </Box>
            <Fab
                color="secondary"
                sx={{ position: "fixed", bottom: 70, right: 10 }}
                href="/transactions/add"
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default Transactions
