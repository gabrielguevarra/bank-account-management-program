class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  };
   
  deposit(amount) {
    if (amount > 0) {
      const transaction = {
        type: "deposit",
        amount: amount,
      };
      this.transactions.push(transaction);
      this.balance += transaction.amount;
      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    } else {
      return 'Deposit amount must be greater than zero.';
    }
  };

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      const transaction = {
        type: "withdraw",
        amount: amount,
      };
      this.transactions.push(transaction);
      this.balance -= transaction.amount;
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return 'Insufficient balance or invalid amount.';
    }
  };

  checkBalance() {
    return `Current balance: $${this.balance}`;
  };

  listAllDeposits() {
    const depositsOnly = [];
    this.transactions.forEach((transaction) => {
      if (transaction.type === "deposit") {
        depositsOnly.push(transaction.amount);
      }
    })
    return `Deposits: ${depositsOnly.join(",")}`
  }

  listAllWithdrawals() {
    const withdrawalsOnly = [];
    this.transactions.forEach((transaction) => {
      if (transaction.type === "withdraw") {
        withdrawalsOnly.push(transaction.amount);
      }
    })
    return `Withdrawals: ${withdrawalsOnly.join(",")}`
  }
};

const myAccount = new BankAccount();
myAccount.deposit(1000)
myAccount.deposit(1000)
myAccount.deposit(1000)
console.log(myAccount.checkBalance());
myAccount.withdraw(500)
myAccount.withdraw(500)
console.log(myAccount.checkBalance());
console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());
