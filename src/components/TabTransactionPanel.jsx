import { Grid, Stack } from "@mui/material"
import TransactionCard from "./TransactionCard"

const TabTransactionPanel = (props) => {
    const { transactions, tabValue, tabIndex, ...other } = props
    return (
        <div
            role="tabtransactionpanel"
            hidden={tabValue !== tabIndex}
            id={`tabtransactionpanel-${tabIndex}`}
            aria-labelledby={`tab-${tabIndex}`}
            {...other}
        >
            {tabValue === tabIndex && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                >
                    <Grid
                        item
                        xs={12}
                        md={8}
                        lg={6}
                    >
                        <Stack
                            spacing={1}
                            marginTop={2}
                        >
                            {transactions?.map((transaction, index) => (
                                <TransactionCard
                                    transaction={transaction}
                                    key={`transaction-${index}`}
                                />
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default TabTransactionPanel
