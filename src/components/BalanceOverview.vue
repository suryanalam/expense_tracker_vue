<script setup>
defineProps({
    total_bal: {
        type: Number,
        required: true
    },
    total_income: {
        type: Number,
        required: true
    },
    total_expense: {
        type: Number,
        required: true
    },
})

const formatTotalBalance = (total_amount) => {
    if (total_amount < 0) {
        return "-$" + `${total_amount}`.split('-')[1];
    }

    return "$" + `${total_amount}`
}
</script>

<template>
    <div class="total_balance_div">
        <h4>Total Balance</h4>
        <span class="balance_amount">{{ formatTotalBalance(total_bal) }}</span>
    </div>
    <div class="income_expense_div">
        <div class="income_details_div">
            <h5>INCOME</h5>
            <span class="income_amount green_clr">+${{ total_income }}</span>
        </div>
        <hr />
        <div class="expense_details_div">
            <h5>EXPENSE</h5>
            <span class="expense_amount red_clr">-${{ total_expense }}</span>
        </div>
    </div>
</template>
