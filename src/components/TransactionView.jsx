import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Grid,
  Box,
  InputLabel,
  InputAdornment,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AmountFormat from "../components/AmountFormat";
import currencies from "../helpers/currency.json";
import categories from "../helpers/categories";
import dayjs, { isDayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useState } from "react";

import {
  useFetchUserExpensesQuery,
  useEditExpenseMutation,
  useDeleteExpenseMutation,
} from "../app/services/expenseApi";
import {
  useFetchUserEarningsQuery,
  useEditEarningMutation,
  useDeleteEarningMutation,
} from "../app/services/earningApi";

const TransactionView = ({ open, toggle, transaction }) => {
  const [transactionType, setTransactionType] = useState(transaction.type);
  const [selectedCurrency, setSelectedCurrency] = useState(
    transaction.currency
  );
  const [showDeleteDialog, toggleDeleteDialog] = useState(false);

  const formSchema = zod
    .object({
      type: zod.enum(["expense", "earning"]),
      category: zod.string().min(1, "Category is required"),
      title: zod
        .string()
        .min(1, "Title is required")
        .max(32, "Title is too long."),
      desc: zod
        .string()
        .max(128, "Description cannot be longer than 128 characters")
        .optional(),
      amount: zod.string().min(1, "Amount is required"),
      currency: zod.string(),
      date: zod.any(),
    })
    .superRefine(({ date }, ctx) => {
      if (!date) {
        ctx.addIssue({
          code: "custom",
          message: "Date is required",
          path: ["date"],
        });
      }
      if (!isDayjs(date)) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid date input",
          path: ["date"],
        });
      }
      if (dayjs().isBefore(dayjs(date))) {
        ctx.addIssue({
          code: "custom",
          message: "You cannot add a future expense",
          path: ["date"],
        });
      }
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      type: transaction.type,
      category: transaction.category,
      title: transaction.title,
      desc: transaction.desc,
      amount: transaction.amount,
      currency: transaction.currency,
      date: dayjs.unix(transaction.date),
    },
  });

  const { refetch: refetchExpenses } = useFetchUserExpensesQuery(
    transaction.userId
  );
  const { refetch: refetchEarnings } = useFetchUserEarningsQuery(
    transaction.userId
  );

  const [editExpense, { isLoading: loadingEditExpense }] =
    useEditExpenseMutation();
  const [editEarning, { isLoading: loadingEditEarning }] =
    useEditEarningMutation();

  const onSubmit = async (data) => {
    try {
      if (transaction.type === "expense") {
        await editExpense({
          userId: transaction.userId,
          docId: transaction.id,
          type: data.type,
          category: data.category,
          title: data.title,
          desc: data.desc,
          amount: parseFloat(data.amount).toFixed(2),
          currency: data.currency,
          date: dayjs(data.date).toDate(),
        });
      } else if (transaction.type === "earning") {
        await editEarning({
          userId: transaction.userId,
          docId: transaction.id,
          type: data.type,
          category: data.category,
          title: data.title,
          desc: data.desc,
          amount: parseFloat(data.amount).toFixed(2),
          currency: data.currency,
          date: dayjs(data.date).toDate(),
        });
      }
      refetchExpenses();
      refetchEarnings();
      toggle(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [deleteExpense, { isLoading: loadingDeleteExpense }] =
    useDeleteExpenseMutation();
  const [deleteEarning, { isLoading: loadingDeleteEarning }] =
    useDeleteEarningMutation();

  const handleDelete = async () => {
    try {
      if (transaction.type === "expense") {
        await deleteExpense({
          userId: transaction.userId,
          docId: transaction.id,
        });
      } else if (transaction.type === "earning") {
        await deleteEarning({
          userId: transaction.userId,
          docId: transaction.id,
        });
      }
      toggle(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={() => toggle(false)}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControl>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  onChange={(event, value) => {
                    setValue("category", "");
                    field.onChange(value);
                    setTransactionType(value);
                  }}
                >
                  <FormControlLabel
                    value="expense"
                    control={<Radio />}
                    label="Expense"
                  />
                  <FormControlLabel
                    value="earning"
                    control={<Radio />}
                    label="Earning"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <FormControl required error={!!errors.category}>
            <InputLabel id="category">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} required labelId="category" label="Category">
                  {categories
                    .filter((category) =>
                      transactionType === "expense"
                        ? category.type === "expense"
                        : category.type === "earning"
                    )
                    .map((category) => (
                      <MenuItem
                        aria-required
                        key={category.name}
                        value={category.name}
                      >
                        <Box component="span" display="flex" gap={2}>
                          {category.icon}
                          {category.name}
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.category ? errors?.category.message : ""}
            </FormHelperText>
          </FormControl>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                required
                label="Title"
                error={!!errors.title}
                helperText={errors.title ? errors?.title.message : ""}
              />
            )}
          />
          <Controller
            name="desc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                multiline
                label="Description"
                error={!!errors.desc}
                helperText={errors.desc ? errors?.desc.message : ""}
              />
            )}
          />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={8}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    label="Amount"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {
                            currencies.find(
                              (currency) => currency.code === selectedCurrency
                            ).symbol
                          }
                        </InputAdornment>
                      ),
                      inputComponent: AmountFormat,
                    }}
                    error={!!errors.amount}
                    helperText={errors.amount ? errors?.amount.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disableClearable
                    options={currencies}
                    getOptionLabel={(option) =>
                      option.code ? option.code : option
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.code === value
                    }
                    onChange={(event, option) => {
                      field.onChange(option.code);
                      setSelectedCurrency(option.code);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Currency"
                        variant="outlined"
                        required
                        error={!!errors.currency}
                        helperText={
                          errors.currency ? errors?.currency.message : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                disableFuture
                closeOnSelect
                format="DD/MM/YYYY"
                maxDate={dayjs(new Date())}
                label="Date"
                onChange={(date) => {
                  field.onChange(date);
                }}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    required: true,
                    error: !!errors.date,
                    helperText: errors.date ? errors?.date.message : "",
                  },
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => toggle(false)}>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Edit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TransactionView;
