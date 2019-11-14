import BankingProducts, { BankAccount, CreditCard } from './BankingProducts';
import Customer, { Age } from './Customer';

export enum Bundles {
    juniorSaver = 0,
    student = 0,
    classic = 1,
    classicPlus = 2,
    gold = 3
}

class ProductBundle extends BankingProducts {
    bundleValue: number;

    constructor(customer) {
        super(customer);
        this.setBundleValue();
    }
    getBundleValue() {
        return this.bundleValue;
    }

    private setBundleValue() {
        if (this.bankAccount === BankAccount.juniorSavings)
            this.bundleValue = Bundles.juniorSaver;
        else if (this.isStudent && this.bankAccount === BankAccount.student)
            this.bundleValue = Bundles.student;
        else if (!this.isStudent && this.bankAccount === BankAccount.current) {
            this.bundleValue = Bundles.classic;
            if (this.creditCardCategory == CreditCard.creditCard)
                this.bundleValue = Bundles.classicPlus;
        }
        else if (!this.isStudent
            && this.bankAccount === BankAccount.currentPlus
            && this.creditCardCategory === CreditCard.goldCreditCard)
            this.bundleValue = Bundles.gold;
    }
}

class BundleAssortmentRestrictions implements RestrictionAnswer {
    result: {
        isRestricted: boolean,
        message?: string
    } = { isRestricted: false };
    isCreditCardRestricted(productBundle: ProductBundle, appliedCreditCard: CreditCard) {
        if (productBundle.ageCategory === Age.junior)
            this.setRestrictionReason('Age is under 17');
        return this.result;
    }
    isBankAccountRestricted(productBundle: ProductBundle, appliedBankAccount: BankAccount) {
        if (productBundle.ageCategory > Age.junior && appliedBankAccount === BankAccount.juniorSavings)
            this.setRestrictionReason('Age is over 17, cannot apply for Junior Savings');
        else if (!productBundle.isStudent && appliedBankAccount === BankAccount.student)
            this.setRestrictionReason('Cannot assign student account to non-students');
        return this.result;
    }
    setRestrictionReason(message) {
        this.result.message = message;
        this.result.isRestricted = true;
    }
}

interface RestrictionAnswer {
    setRestrictionReason(message);
}

class BundleAssortment extends BundleAssortmentRestrictions{
    appliedProd: {
        bankAccount?: BankAccount,
        creditCardCategory?: CreditCard,
        debitCardStatus?: boolean
    };

    constructor(){
        super();
    }
    private applyModificationForBankAccount(productBundle:ProductBundle, appliedModBankAccount:BankAccount){
        let isRestrictedResult = this.isBankAccountRestricted(productBundle,appliedModBankAccount);
        if(isRestrictedResult.isRestricted === false){
            if(appliedModBankAccount > productBundle.bankAccount){
                this.setRestrictionReason('U applied higher Bank account');
            }
        }
        return this.result;
    }

    private applyModificationForBankAccount(productBundle:ProductBundle, appliedModBankAccount:BankAccount){
        let isRestrictedResult = this.isBankAccountRestricted(productBundle,appliedModBankAccount);
        if(isRestrictedResult.isRestricted === false){
            if(appliedModBankAccount > productBundle.bankAccount){
                this.setRestrictionReason('U applied higher Bank account');
            }
        }
        return this.result;
    }
    
    applyForProduct(customer, appliedProduct) {
        let productBundle: ProductBundle = new ProductBundle(customer);
        if (appliedProduct.bankAccount)
            this.setAppliedBankAccount(appliedProduct.bankAccount);
        if (appliedProduct.creditCard)
            this.setAppliedCreditCard(appliedProduct.creditCard);

        

    }
    private setAppliedCreditCard(appliedCreditCard) {
        switch (appliedCreditCard.toUpperCase()) {
            case 'CREDIT CARD':
                this.appliedProd.creditCardCategory = CreditCard.creditCard;
                break;
            case 'GOLD CREDIT CARD':
                this.appliedProd.creditCardCategory = CreditCard.goldCreditCard;
                break;
        }
    }
    private setAppliedBankAccount(appliedBankAccount) {
        switch (appliedBankAccount.toUpperCase()) {
            case 'JUNIOR SAVINGS':
                this.appliedProd.bankAccount = BankAccount.juniorSavings;
                break;
            case 'STUDENT':
                this.appliedProd.bankAccount = BankAccount.student;
                break;
            case 'CURRENT':
                this.appliedProd.bankAccount = BankAccount.current;
                break;
            case 'CURRENT PLUS':
                this.appliedProd.bankAccount = BankAccount.currentPlus;
                break;
        }
    }
}



export default ProductBundle;