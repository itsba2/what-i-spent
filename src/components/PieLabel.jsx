import { useTheme } from "@mui/material"
import { chartColors } from "../helpers/helpers"

const RADIAN = Math.PI / 180

const PieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === "dark"
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + outerRadius * 1.1 * Math.cos(-midAngle * RADIAN)
    const y = cy + outerRadius * 1.1 * Math.sin(-midAngle * RADIAN)
    return (
        <text
            x={x}
            y={y}
            fill={
                isDark
                    ? chartColors.onDark[index % chartColors.onDark.length]
                    : chartColors.onLight[index % chartColors.onLight.length]
            }
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >{`${(percent * 100).toFixed(0)}% `}</text>
    )
}

export default PieLabel
