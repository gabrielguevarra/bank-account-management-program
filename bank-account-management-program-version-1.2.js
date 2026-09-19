class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  };

  saveToStorage() {
    const accountData = {
      balance: this.balance,
      transactions: this.transactions
    };

    localStorage.setItem("bankAccountData", JSON.stringify(accountData));
  }

  resetAccount() {
    this.balance = 0;
    this.transactions = [];

    localStorage.removeItem("bankAccountData");

    return "Account data has been completely cleared and reset.";
  }

  deposit(amount) {
    if (amount > 0) {
      const transaction = {
        type: "deposit",
        amount: amount,
      };
      this.transactions.push(transaction);
      this.balance += transaction.amount;

      this.saveToStorage();
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

      this.saveToStorage();
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return 'Insufficient balance or invalid amount.';
    }
  };

  processPosting(amount, transactionType) {
    if (transactionType === "deposit") {
      return this.deposit(amount);
    } else if (transactionType === "withdraw") {
      return this.withdraw(amount);
    } else {
      return 'Invalid transaction type.';
    }
  }
 
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


function initializeAccount() {
  const savedDataString = localStorage.getItem("bankAccountData");
  const account = new BankAccount();
  
  if (savedDataString) {
    const parsedData = JSON.parse(savedDataString);
    account.balance = parsedData.balance;
    account.transactions = parsedData.transactions;
  }
  
  return account;
}

const myAccount = initializeAccount();

console.log(myAccount.deposit(500));
console.log(myAccount.checkBalance());
console.log(myAccount.deposit(1000));
console.log(myAccount.checkBalance());