<script setup>
import Header from "./components/Header.vue";
import BalanceOverview from "./components/BalanceOverview.vue";
import TransactionHistory from "./components/TransactionHistory.vue";
import AddTransactionForm from "./components/AddTransactionForm.vue";

import { ref, computed, onMounted } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();
const transactions = ref([]);

// fetch the saved transactions from local storage when component mounts
onMounted(() => {
  let savedTransaction = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransaction.length > 0) {
    transactions.value = savedTransaction;
  }
});

// calculate total income of all transactions using transaction type
const total_income = computed(() => {
  let income_transactions = transactions.value.filter((transaction) => transaction.type === "income");
  let total_income = income_transactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0);

  return total_income;
});

// calculate total income of all transactions using transaction type
const total_expense = computed(() => {
  let expense_transactions = transactions.value.filter((transaction) => transaction.type === "expense");
  let total_expense = expense_transactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0);

  return total_expense;
});

// calculate total balance based on total income and total expense
const total_bal = computed(() => {
  let total_amount = (total_income.value - total_expense.value);
  
  return total_amount;
});

const addTransactionData = (transactionData) => {
  if (!transactionData) {
    toast.error('Transaction data not found!!')
    return;
  }

  transactions.value.push(transactionData);
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
  toast.success('Transacation added successfully!!');
}

const deleteTransactionData = (transactionId) => {
  let updatedTransactions = transactions.value.filter((_, index) => index !== transactionId);
  transactions.value = updatedTransactions;
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
  toast.success('Transacation deleted successfully!!');
}
</script>

<template>
  <Header />
  <main>
    <section class="left_container">
      <AddTransactionForm @addTransaction="addTransactionData" />
    </section>
    <section class="right_container">
      <BalanceOverview :total_income="+total_income" :total_expense="+total_expense" :total_bal="+total_bal"/>
      <TransactionHistory :transactions="transactions" @deleteTransaction="deleteTransactionData" />
    </section>
  </main>
</template>
