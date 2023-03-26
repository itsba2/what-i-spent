import { forwardRef } from "react"
import { NumericFormat } from "react-number-format"

const AmountFormat = forwardRef((props, ref) => {
    const { onChange, ...other } = props
    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                })
            }}
            thousandSeparator
            valueIsNumericString
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale
        />
    )
})

export default AmountFormat
