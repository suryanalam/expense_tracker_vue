<script setup>
defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['deleteTransaction']);

function handleDeleteTransaction(index) {
    emit("deleteTransaction", index);
}
</script>

<template>
    <div class="transactions_history_div">
        <h4>History</h4>
        <hr />
        <div class="transactions_wrapper_div">
            <p v-if="transactions.length == 0">No Transaction Hisory</p>
            <div class="transaction_item" v-for="(transaction, index) in transactions" :key="index"
                :class="transaction.type === 'expense' ? 'red_border' : 'green_border'">
                <section class="transaction_details_wrapper">
                    <span>{{ transaction.title }}</span>
                    <span>${{ transaction.amount }}</span>
                </section>
                <button type="btn" class="action_btn delete_btn" @click="handleDeleteTransaction(index)">Delete</button>
            </div>
        </div>
    </div>
</template>