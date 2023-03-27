import { Stack } from "@mui/material"
import TransactionItem from "./TransactionItem"

const TabPanel = (props) => {
    const { transactions, tabValue, tabIndex, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={tabValue !== tabIndex}
            id={`tabpanel-${tabIndex}`}
            aria-labelledby={`tab-${tabIndex}`}
            {...other}
        >
            {tabValue === tabIndex && (
                <Stack spacing={1} marginTop={2}>
                    {transactions?.map((transaction, index) => (
                        <TransactionItem
                            transaction={transaction}
                            key={`transaction-${index}`}
                        />
                    ))}
                </Stack>
            )}
        </div>
    )
}

export default TabPanel
