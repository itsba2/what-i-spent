import {
    Box,
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
    useMediaQuery,
    useTheme,
    Grid,
    InputAdornment,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CardActions,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material"
import { Add as AddIcon, Close as CancelIcon } from "@mui/icons-material"
import { useState } from "react"
import { resolveFirebaseError } from "../helpers/helpers"
import categories from "../helpers/categories"
import { useAuth } from "../auth/AuthProvider"
import { useNavigate } from "react-router-dom"
import Feedback from "../components/Feedback"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { isDayjs } from "dayjs"
import AmountFormat from "../components/AmountFormat"
import currencies from "../helpers/currency.json"
import { addTransaction } from "../firebase/transaction"

const initialFeedback = { type: "error", show: false, msg: "" }

const AddTransaction = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState(initialFeedback)
    const [selectedCurrency, setSelectedCurrency] = useState(
        currentUser.currencyPref
    )
    const [transactionType, setTransactionType] = useState("expense")

    const theme = useTheme()
    const mobileView = useMediaQuery(theme.breakpoints.down("sm"))
    const largeView = useMediaQuery(theme.breakpoints.up("lg"))

    const formSchema = zod
        .object({
            type: zod.enum(["expense", "earning"]),
            category: zod.string().min(1, "Category is required"),
            title: zod
                .string()
                .min(1, "Title is required")
                .max(61, "Title is too long."),
            desc: zod
                .string()
                .max(100, "Description cannot be longer than 100 characters")
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
                })
            }
            if (!isDayjs(date)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Invalid date input",
                    path: ["date"],
                })
            }
            if (dayjs().isBefore(dayjs(date))) {
                ctx.addIssue({
                    code: "custom",
                    message: "You cannot add a future expense",
                    path: ["date"],
                })
            }
        })

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            type: "expense",
            category: "",
            title: "",
            desc: "",
            amount: "",
            currency: currentUser.currencyPref,
            date: dayjs(new Date()),
        },
    })

    const onSubmit = async (data) => {
        try {
            const response = await addTransaction(
                currentUser.id,
                data.type,
                data.category,
                data.title,
                data.desc,
                parseFloat(data.amount).toFixed(2),
                data.currency,
                dayjs(data.date).toDate()
            )
            setFeedback({ type: "success", show: true, msg: response.msg })
        } catch (error) {
            setFeedback({
                type: "error",
                show: true,
                msg: resolveFirebaseError(error.code),
            })
        }
    }

    return (
        <>
            <Card
                elevation={1}
                sx={{
                    my: 4,
                    maxWidth: 550,
                    width: mobileView ? "100%" : largeView ? "50%" : "75%",
                }}
            >
                <CardHeader title="Add Transaction" />
                <CardContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                        onSubmit={handleSubmit(onSubmit)}
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
                                            setValue("category", "")
                                            field.onChange(value)
                                            setTransactionType(value)
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
                            ></Controller>
                        </FormControl>
                        <FormControl required error={!!errors.category}>
                            <InputLabel id="category">Category</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        required
                                        labelId="category"
                                        label="Category"
                                    
                                    >
                                        {categories
                                            .filter((category) =>
                                                transactionType === "expense"
                                                    ? category.type ===
                                                      "expense"
                                                    : category.type ===
                                                      "earning"
                                            )
                                            .map((category) => (
                                                <MenuItem
                                                    aria-required
                                                    key={category.name}
                                                    value={category.name}
                                                >
                                                    <Box
                                                        component="span"
                                                        display="flex"
                                                        gap={2}
                                                    >
                                                        {category.icon}
                                                        {category.name}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
                            ></Controller>
                            <FormHelperText>
                                {errors.category
                                    ? errors?.category.message
                                    : ""}
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
                                    helperText={
                                        errors.title
                                            ? errors?.title.message
                                            : ""
                                    }
                                />
                            )}
                        ></Controller>
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
                                    helperText={
                                        errors.desc ? errors?.desc.message : ""
                                    }
                                />
                            )}
                        ></Controller>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={7}
                                sm={8}
                            >
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
                                                        {selectedCurrency}
                                                    </InputAdornment>
                                                ),
                                                inputComponent: AmountFormat,
                                            }}
                                            error={!!errors.amount}
                                            helperText={
                                                errors.amount
                                                    ? errors?.amount.message
                                                    : ""
                                            }
                                        />
                                    )}
                                ></Controller>
                            </Grid>
                            <Grid
                                item
                                xs={5}
                                sm={4}
                            >
                                <Controller
                                    name="currency"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            disableClearable
                                            options={currencies}
                                            getOptionLabel={(option) =>
                                                option.code
                                                    ? option.code
                                                    : option
                                            }
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) => option.code === value}
                                            onChange={(event, option) => {
                                                field.onChange(option.code)
                                                setSelectedCurrency(option.code)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Currency"
                                                    variant="outlined"
                                                    required
                                                    error={!!errors.currency}
                                                    helperText={
                                                        errors.currency
                                                            ? errors?.currency
                                                                  .message
                                                            : ""
                                                    }
                                                />
                                            )}
                                        />
                                    )}
                                ></Controller>
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
                                        field.onChange(date)
                                    }}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            required: true,
                                            error: !!errors.date,
                                            helperText: errors.date
                                                ? errors?.date.message
                                                : "",
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                        <CardActions
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<CancelIcon />}
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                type="submit"
                            >
                                Add Expense
                            </Button>
                        </CardActions>
                    </Box>
                </CardContent>
            </Card>
            <Feedback
                feedback={feedback}
                setFeedback={setFeedback}
            />
        </>
    )
}

export default AddTransaction
