<script setup lang="ts">
import { ref } from 'vue';
import { Account } from '../stores/accountStore'

const form = ref()

defineProps({
    data: {
        type: Object as Account,
        default: () => ({})
    }
})

const emit = defineEmits(['on:remove'])

const rules = {
  required: value => !!value || 'Обязательное поле',
  max50: v => v.length <= 50 || 'Максимум 50 символов',
  max100: v => v.length <= 100 || 'Максимум 100 символов'
}

function removeAccount (id: number) {
    emit('on:remove', id)
}

function updateAccount (account: Account, field: keyof Account, value: any) {
    if (field === 'labels') {
        value = value.split(';').map(text => ({ text: text.trim() })).filter(label => label.text);
    }
    const updatedAccount = { ...account, [field]: value };
    form.value.validate().then((res) => {
        if (res.valid) {
            emit('on:update', updatedAccount)
        }
    })
};

</script>

<template>
    <v-form ref="form">
        <v-row>
            <v-col cols="6" md="3">
                <v-text-field 
                    label="Метка"
                    variant="outlined"
                    :rules="[rules.max50]"
                    :model-value="data.labels?.map(label => label.text).join('; ')"
                    @blur="updateAccount(data, 'labels', $event.target.value)"
                />
            </v-col>
            <v-col cols="6" md="3">
                <v-select
                    label="Тип записи"
                    variant="outlined"
                    :items="['LDAP', 'Локальная']"
                    :model-value="data.type"
                    @update:modelValue="updateAccount(data, 'type', $event)"
                />
            </v-col>
            <v-col :cols="data.type === 'Локальная' ? 5 : 10" :md="data.type === 'Локальная' ? 3 : 5">
                <v-text-field
                    label="Логин"
                    variant="outlined"
                    :model-value="data.login"
                    :rules="[rules.required, rules.max100]"
                    @blur="updateAccount(data, 'login', $event.target.value)"
                />
            </v-col>
            <v-col v-if="data.type === 'Локальная'" cols="5" md="2">
                <v-text-field
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    :model-value="data.password"
                    :rules="[rules.required, rules.max100]"
                    @blur="updateAccount(data, 'password', $event.target.value)"
                />
            </v-col>
            <v-col cols="2" md="1">
                <v-btn color="red" icon @click="removeAccount(data.id)">
                    <v-icon icon="mdi-delete" />
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<style scoped>
:deep(.v-text-field .v-input__details) {
    padding-inline: 0;
}
</style>