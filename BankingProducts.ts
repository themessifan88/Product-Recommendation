import Customer, { Age, Income } from './Customer';

export enum BankAccount {
    juniorSavings = 0,
    student,
    current,
    currentPlus
}
export enum CreditCard {
    creditCard = 0,
    goldCreditCard
}

class BankingProducts extends Customer {
    bankAccount: BankAccount;
    creditCardCategory: CreditCard;
    debitCardStatus: boolean = false;
    constructor(customer) {
        super(customer);
        this.debitCardStatus = this.getDebitCardStatus();
        this.setBankAccountCategory();
        this.setCreditCard();
    }

    private setBankAccountCategory() {
        if (this.ageCategory === Age.junior)
            this.bankAccount = BankAccount.juniorSavings;
        else if (this.ageCategory > Age.junior) {
            if (this.isStudent)
                this.bankAccount = BankAccount.student;
            else if (this.incomeCategory > Income.zeroIncome && this.incomeCategory < Income.high)
                this.bankAccount = BankAccount.current;
            else if (this.incomeCategory === Income.high)
                this.bankAccount = BankAccount.currentPlus;
        }
    }

    private setCreditCard() {
        if (this.ageCategory > Age.junior) {
            if (this.incomeCategory === Income.middle)
                this.creditCardCategory = CreditCard.creditCard;
            else if (this.incomeCategory === Income.high)
                this.creditCardCategory = CreditCard.goldCreditCard;
        }

    }

    private getDebitCardStatus(this) {
        if (this.ageCategory > Age.junior) {
            if (this.isStudent) {
                return true;
            }
            return this.incomeCategory > Income.zeroIncome;
        }
    }
}

export default BankingProducts;