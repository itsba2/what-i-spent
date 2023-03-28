const Stats = class {
    constructor(expenses, earnings) {
        this.expenses = expenses
        this.earnings = earnings
    }

    calcTotalExpenses() {
        return this.expenses?.reduce((sum, current) => {
            return sum + parseFloat(current.amount)
        }, 0)
    }
    calcTotalEarnings() {
        return this.earnings?.reduce((sum, current) => {
            return sum + parseFloat(current.amount)
        }, 0)
    }

    calcSummary() {}
}

export default Stats
