import { Pie, PieChart, Legend, Tooltip, Cell } from "recharts";
import { useTheme, useMediaQuery } from "@mui/material";
import { useFetchUserExpensesQuery } from "../app/services/expenseApi";
import { useFetchUserEarningsQuery } from "../app/services/earningApi";
import { useAuth } from "../auth/AuthProvider";
import { Box } from "@mui/material";
import PieLabel from "../components/PieLabel";
import { chartColors } from "../helpers/helpers";

const Stats = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";
  const { expenseStats, expenseStatsFetched } = useFetchUserExpensesQuery(
    currentUser.id,
    {
      selectFromResult: ({ data, isSuccess }) => {
        const queryData = data || [];
        const stats = queryData?.map((expense) => ({
          category: expense.category,
          amount: parseFloat(expense.amount),
          currency: expense.currency,
        }));
        return { expenseStats: stats, expenseStatsFetched: isSuccess };
      },
    }
  );
  return (
    <Box
      component="div"
      sx={{ width: "100%" }}
      display="flex"
      justifyContent="center"
    >
      {expenseStatsFetched && (
        <PieChart width={isMobile ? 350 : 500} height={isMobile ? 350 : 500}>
          <Pie
            nameKey="category"
            dataKey="amount"
            data={expenseStats}
            innerRadius={isMobile ? 70 : 100}
            outerRadius={isMobile ? 105 : 150}
            paddingAngle={3}
            labelLine={false}
            label={<PieLabel />}
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize,
            }}
          >
            {expenseStats.map((stat, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  isDark
                    ? chartColors.onDark[index % chartColors.onDark.length]
                    : chartColors.onLight[index % chartColors.onLight.length]
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </Box>
  );
};

export default Stats;
