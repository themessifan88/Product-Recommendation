export enum Age {
    junior = 0,
    adult,
    senior
}

export enum Income {
    zeroIncome = 0,
    low,
    middle,
    high
}

class Customer {
    ageCategory: Age;
    isStudent: boolean;
    incomeCategory: Income;

    constructor(customer) {
        this.setAgeCategory(customer.age);
        this.setStudentStatus(customer.student);
        this.setIncomeCategory(customer.income);
    }
    private setAgeCategory(age) {
        if (age && typeof age === 'number') {
            if (age < 18)
                this.ageCategory = Age.junior;
            else if (17 < age && age < 65)
                this.ageCategory = Age.adult;
            else
                this.ageCategory = Age.senior;
        }
    }
    private setIncomeCategory(income) {
        if (income && typeof income) {
            if (income <= 0)
                this.incomeCategory = Income.zeroIncome;
            else if (income > 0 && income <= 12000)
                this.incomeCategory = Income.low;
            else if (income > 12000 && income <= 40000)
                this.incomeCategory = Income.middle;
            else if (income > 40000)
                this.incomeCategory = Income.high;
        }
    }

    private setStudentStatus(student) {
        this.isStudent = student && student.toString().toUpperCase() === 'YES';
    }
}

export default Customer;