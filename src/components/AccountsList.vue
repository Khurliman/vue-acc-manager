<script setup lang="ts">
import { ref, computed, watch, useTemplateRef } from 'vue';
import { useAccountStore } from '../stores/accountStore'
import { storeToRefs } from 'pinia'
import AccountForm from './AccountForm.vue'

const store = useAccountStore()
const { accounts } = storeToRefs(store)

watch(accounts, () => {
    store.updateStorage();
}, { 
    deep: true 
});

function addAccount () {
    store.addAccount()
}

function removeAccount (id: number) {
    store.removeAccount(id)
}

function updateAccount (account: Account) {
    store.updateAccount(account);
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col class="d-flex ga-4">
                <h2>Учетные записи</h2>
                <v-btn color="primary" variant="tonal" @click="addAccount">
                    <v-icon icon="mdi-plus" />
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="mb-8 mt-6 rounded-lg" style="background: rgb(201 225 253);">
            <v-col>
                <p class="text-subtitle-2">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
            </v-col>
        </v-row>

        <AccountForm 
            v-for="account in accounts"
            :key="account.id"
            :data="account"
            @on:remove="removeAccount"
            @on:update="updateAccount"
        />
    </v-container>
</template>

<style scoped>
</style>