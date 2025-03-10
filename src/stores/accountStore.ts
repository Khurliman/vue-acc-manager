import { defineStore } from 'pinia'

export interface Account {
    id: number;
    labels: { text: string }[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
}

export const useAccountStore = defineStore('accountStore', {
    state: () => ({
        accounts: [] as Account[]
    }),
    getters: {
        getAccounts: (state) => state.accounts
    },
    actions: {
        initStore () {
            const storedAccounts = localStorage.getItem('accounts');
            if (storedAccounts) {
              this.accounts = JSON.parse(storedAccounts);
            }
        },
        addAccount () {
            this.accounts.push({
                id: Date.now(),
                labels: [],
                type: 'Локальная',
                login: '',
                password: ''
            })
        },
        removeAccount (id: number) {
            this.accounts = this.accounts.filter((acc: Account) => acc.id !== id)
        },
        updateAccount (updatedAcc: Account) {
            const index = this.accounts.findIndex((acc: Account) => acc.id === updatedAcc.id)
            if (index !== -1) {
                this.accounts[index] = updatedAcc
            }
        },
        updateStorage() {
            localStorage.setItem('accounts', JSON.stringify(this.accounts));
        }
    }
})
