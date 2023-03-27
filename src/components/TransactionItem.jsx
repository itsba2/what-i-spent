import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    CardActionArea,
    IconButton,
    Collapse,
    Typography,
    Grid,
} from "@mui/material"

import {
    ExpandLess as LessIcon,
    ExpandMore as MoreIcon,
    Edit as EditIcon,
} from "@mui/icons-material"
import dayjs from "dayjs"
import { useState } from "react"

const TransactionItem = ({ transaction }) => {
    const [expand, setExpand] = useState(false)
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
                            xs={2}
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
                            xs={6}
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
                            textAlign="end"
                        >
                            <Typography variant="body1">{`${transaction.currency} ${transaction.amount}`}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "column" }}>
                    <IconButton>
                        {/* TODO: edit operation */}
                        <EditIcon />
                    </IconButton>
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

export default TransactionItem
