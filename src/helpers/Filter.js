const Filter = class {
    constructor(transactions) {
        this.transactions = transactions
    }

    maxTransactionAmount() {
        let amountList = this.transactions.map(
            (transaction) => transaction.amount
        )
        return Math.max(...amountList)
    }
    get maxAmount() {
        return this.maxTransactionAmount()
    }

    minTransactionAmount() {
        let amountList = this.transactions.map(
            (transaction) => transaction.amount
        )
        return Math.min(...amountList)
    }

    get minAmount() {
        return this.minTransactionAmount()
    }
}

export default Filter
