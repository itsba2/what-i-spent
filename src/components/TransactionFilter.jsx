import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Autocomplete,
    Grid,
    Box,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import AmountFormat from "../components/AmountFormat"
import currencies from "../helpers/currency.json"

import dayjs, { isDayjs } from "dayjs"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"

const TransactionFilter = ({
    open,
    toggle,
    filterOptions,
    setFilterOptions,
}) => {
    const formSchema = zod
        .object({
            startDate: zod.any(),
            endDate: zod.any(),
            minAmount: zod.string(),
            maxAmount: zod.string(),
            currency: zod.string(),
        })
        .superRefine(({ startDate, endDate }, ctx) => {
            if (!startDate) {
                ctx.addIssue({
                    code: "custom",
                    message: "Date is required",
                    path: ["startDate"],
                })
            }
            if (!isDayjs(startDate)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Invalid date input",
                    path: ["startDate"],
                })
            }
            if (!endDate) {
                ctx.addIssue({
                    code: "custom",
                    message: "Date is required",
                    path: ["endDate"],
                })
            }
            if (!isDayjs(endDate)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Invalid date input",
                    path: ["endDate"],
                })
            }
            if (
                startDate &&
                endDate &&
                dayjs(startDate).isAfter(dayjs(endDate))
            ) {
                ctx.addIssue({
                    code: "custom",
                    message: "Start Date cannot be later than End Date",
                    path: ["startDate", "endDate"],
                })
            }
        })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            startDate: filterOptions.startDate,
            endDate: filterOptions.endDate,
            minAmount: filterOptions.minAmount,
            maxAmount: filterOptions.maxAmount,
            currency: filterOptions.currency,
        },
    })

    const onSubmit = (data) => {
        setFilterOptions(data)
        toggle(false)
    }
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={() => toggle(false)}
        >
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>Filter</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        marginTop={0}
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        closeOnSelect
                                        format="DD/MM/YYYY"
                                        label="Start Date"
                                        onChange={(date) => {
                                            field.onChange(date)
                                        }}
                                        slotProps={{
                                            textField: {
                                                variant: "outlined",
                                                fullWidth: true,
                                                error: !!errors.startDate,
                                                helperText: errors.startDate
                                                    ? errors?.startDate.message
                                                    : "",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        closeOnSelect
                                        format="DD/MM/YYYY"
                                        label="End Date"
                                        onChange={(date) => {
                                            field.onChange(date)
                                        }}
                                        slotProps={{
                                            textField: {
                                                variant: "outlined",
                                                fullWidth: true,
                                                error: !!errors.endDate,
                                                helperText: errors.endDate
                                                    ? errors?.endDate.message
                                                    : "",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Controller
                                name="minAmount"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        label="Min. Amount"
                                        InputProps={{
                                            inputComponent: AmountFormat,
                                        }}
                                        error={!!errors.minAmount}
                                        helperText={
                                            errors.minAmount
                                                ? errors?.minAmount.message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Controller
                                name="maxAmount"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        label="Max. Amount"
                                        InputProps={{
                                            inputComponent: AmountFormat,
                                        }}
                                        error={!!errors.maxAmount}
                                        helperText={
                                            errors.maxAmount
                                                ? errors?.maxAmount.message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Controller
                                name="currency"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        options={[
                                            { code: "None" },
                                            ...currencies,
                                        ]}
                                        getOptionLabel={(option) =>
                                            option.code ? option.code : option
                                        }
                                        isOptionEqualToValue={(option, value) =>
                                            option.code === value
                                        }
                                        onChange={(event, option) => {
                                            field.onChange(
                                                option?.code || "None"
                                            )
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Currency"
                                                fullWidth
                                                variant="outlined"
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
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => toggle(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default TransactionFilter
