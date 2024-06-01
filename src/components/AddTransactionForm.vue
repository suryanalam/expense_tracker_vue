<script setup>
import { useToast } from "vue-toastification";
import { ref } from "vue";

let toast = useToast();
const emit = defineEmits(['formSubmitted']);

let title = ref('');
let amount = ref(null);
let type = ref('');

function onSubmit() {
    if (title.value == "" || amount.value == null || type.value == "") {
        toast.error("All fields are required to fill!!");
        return;
    }
  
    const transactionData = {
        title: title.value,
        amount: amount.value,
        type: type.value
    }

    emit('addTransaction', transactionData);

    title.value = '';
    amount.value = null;
    type.value = '';
}
</script>


<template>
    <div class="form_wrapper">
        <h4>New Transaction</h4>
        <hr />
        <form id="form" @submit.prevent="onSubmit">
            <div class="form_group">
                <label for="title">Title: </label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div class="form_group">
                <label for="amount">Amount: </label>
                <input type="number" name="amount" id="amount" v-model="amount">
            </div>
            <div class="form_group">
                <label for="type">Type: </label>
                <div class="radio_btns_wrapper">
                    <span class="radio_option_wrapper">
                        <input type="radio" name="type" id="income" value="income" v-model="type">
                        <label for="type">Income</label>
                    </span>
                    <span class="radio_option_wrapper">
                        <input type="radio" name="type" id="expense" value="expense" v-model="type">
                        <label for="type">Expense</label>
                    </span>
                </div>
            </div>
            <button type="submit" class="form-btn">Add Transaction</button>
        </form>
    </div>
</template>