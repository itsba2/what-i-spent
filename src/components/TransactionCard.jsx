import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Chip,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

import currencies from "../helpers/currency.json";
import { useAuth } from "../auth/AuthProvider";
import TransactionView from "./TransactionView";

const TransactionCard = ({ transaction }) => {
  const { currentUser } = useAuth();
  const theme = useTheme();

  const [showViewDialog, toggleViewDialog] = useState(false);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardActionArea onClick={() => toggleViewDialog(true)}>
          <CardContent sx={{ paddingY: 1, flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4} sm={3}>
                <Box
                  component="div"
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  gap={1}
                >
                  <Chip
                    label={toDayName(transaction.date)}
                    color="secondary"
                    sx={{ width: 54 }}
                  />
                  <Typography variant="subtitle1">
                    {`${toDayNumber(transaction.date)} ${toMonth(
                      transaction.date
                    )}`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={5}>
                <Box
                  component="div"
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Typography variant="body1" noWrap>
                    {transaction.title}
                  </Typography>
                  <Typography variant="caption">
                    {transaction.category}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} textAlign="end">
                <Typography
                  variant="subtitle1"
                  color={
                    transaction.type === "expense"
                      ? theme.palette.error.main
                      : theme.palette.success.main
                  }
                >{`${
                  currencies.find(
                    (currency) => currency.code === transaction.currency
                  ).symbol
                }${transaction.amount}`}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      {showViewDialog && (
        <TransactionView
          open={showViewDialog}
          toggle={toggleViewDialog}
          transaction={transaction}
        />
      )}
    </>
  );
};

const toDayName = (timestamp) => {
  return dayjs.unix(timestamp).format("ddd");
};

const toDayNumber = (timestamp) => {
  return dayjs.unix(timestamp).format("DD");
};

const toMonth = (timestamp) => {
  return dayjs.unix(timestamp).format("MMM");
};

const toYear = (timestamp) => {
  return dayjs.unix(timestamp).format("YYYY");
};

export default TransactionCard;
