import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Fab,
    Stack,
    Typography,
} from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { useAuth } from "../auth/AuthProvider"
import { useFetchUserExpensesQuery } from "../app/services/expenseApi"

const Transactions = () => {
    const { currentUser } = useAuth()

    const {
        data: transactions,
        isLoading,
        isSuccess,
    } = useFetchUserExpensesQuery(currentUser.id)

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                width="100%"
            >
                <Typography variant="h5" textAlign="center">Transactions</Typography>
                <Box>
                    {isSuccess && (
                        <Stack spacing={1}>
                            {transactions.map((transaction, index) => (
                                <Card key={`transaction${index}`}>
                                    <CardHeader title={transaction.title} />
                                    <CardContent>
                                        <Box component="p">{`${transaction.amount} ${transaction.currency}`}</Box>
                                        <Box component="p">
                                            {transaction.category}
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Box>
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
