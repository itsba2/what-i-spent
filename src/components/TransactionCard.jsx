import {
    Box,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    Typography,
    Grid,
    Menu,
    MenuItem,
    Button,
} from "@mui/material"
import {
    ExpandLess as LessIcon,
    ExpandMore as MoreIcon,
    Edit as EditIcon,
    MoreVert as Dot3Icon,
    Delete as DeleteIcon,
} from "@mui/icons-material"
import dayjs from "dayjs"
import { useState } from "react"

import currencies from "../helpers/currency.json"
import { useDeleteExpenseMutation } from "../app/services/expenseApi"
import { useDeleteEarningMutation } from "../app/services/earningApi"
import { useAuth } from "../auth/AuthProvider"

const TransactionCard = ({ transaction }) => {
    const { currentUser } = useAuth()
    const [expand, setExpand] = useState(false)
    const [moreEl, setMoreEl] = useState(null)
    const openMore = Boolean(moreEl)

    const [deleteExpense, { isLoading: deletingExpense }] =
        useDeleteExpenseMutation()
    const [deleteEarning, { isLoading: deletingEarning }] =
        useDeleteEarningMutation()

    const handleDeleteTransaction = async () => {
        try {
            if (transaction.type === "expense") {
                await deleteExpense({
                    userId: currentUser.id,
                    docId: transaction.id,
                })
            } else if (transaction.type === "earning") {
                await deleteEarning({
                    userId: currentUser.id,
                    docId: transaction.id,
                })
            }
            setMoreEl(null)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Card sx={{ display: "flex", flexDirection: "column" }}>
            <Box
                component="div"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <CardContent sx={{ paddingY: 0, flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={4}
                            sm={3}
                        >
                            <Box
                                component="div"
                                display="flex"
                                flexDirection="column"
                                gap={1}
                            >
                                <Typography variant="body2">
                                    {`${toDayNumber(
                                        transaction.date
                                    )} ${toMonth(transaction.date)}`}
                                </Typography>
                                <Typography variant="body1">
                                    {toDayName(transaction.date)}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sm={5}
                        >
                            <Box
                                component="div"
                                display="flex"
                                flexDirection="column"
                                gap={2}
                            >
                                <Typography
                                    variant="body1"
                                    noWrap
                                >
                                    {transaction.title}
                                </Typography>
                                <Typography variant="caption">
                                    {transaction.category}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            textAlign="end"
                        >
                            <Typography variant="body1">{`${
                                currencies.find(
                                    (currency) =>
                                        currency.code === transaction.currency
                                ).symbol
                            }${transaction.amount}`}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                    }}
                >
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMore ? "long-menu" : undefined}
                        aria-expanded={openMore ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => setMoreEl(event.currentTarget)}
                    >
                        <Dot3Icon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{ "aria-labelledby": "long-button" }}
                        anchorEl={moreEl}
                        open={openMore}
                        onClose={() => setMoreEl(null)}
                    >
                        <MenuItem
                            divider
                            disableGutters
                        >
                            <Button
                                href={`/transactions/edit/${transaction.id}`}
                                startIcon={<EditIcon />}
                                fullWidth
                                disableElevation
                            >
                                Edit
                            </Button>
                        </MenuItem>
                        <MenuItem disableGutters>
                            <Button
                                fullWidth
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteTransaction}
                            >
                                Delete
                            </Button>
                        </MenuItem>
                    </Menu>
                    <IconButton onClick={() => setExpand((prev) => !prev)}>
                        {expand ? <LessIcon /> : <MoreIcon />}
                    </IconButton>
                </CardActions>
            </Box>
            <Collapse in={expand}>
                <Typography
                    variant="body2"
                    color={!transaction.desc.length && "grey"}
                    fontStyle={!transaction.desc.length && "italic"}
                    padding={2}
                >
                    {transaction.desc.length
                        ? transaction.desc
                        : "No description for this transaction."}
                </Typography>
            </Collapse>
        </Card>
    )
}

const toDayName = (timestamp) => {
    return dayjs.unix(timestamp).format("ddd")
}

const toDayNumber = (timestamp) => {
    return dayjs.unix(timestamp).format("DD")
}

const toMonth = (timestamp) => {
    return dayjs.unix(timestamp).format("MMM")
}

const toYear = (timestamp) => {
    return dayjs.unix(timestamp).format("YYYY")
}

export default TransactionCard
