# Tangle-Cruiser
This application depends on tangle-connect, a locally built typescript library.
To begin with, choose a base folder and clone tangle-cruiser and tangle-connect into the this folder. The detailed steps to follow are given below.

## Step 1 - Build tangle-connect
This is a typescript library for decoupling the backend from UI. Follow the steps to build the library.
- git clone https://github.com/cadencedatasoft-dot-in/tangle-connect.git
- cd tangle-connect
- npm install
- npm run build

## Step 2 - Build and run tangle-cruiser
This is a svelte UI build using sveltestrap + bootstrap
- git clone https://github.com/cadencedatasoft-dot-in/tangle-cruiser.git
- cd tangle-cruiser/
- npm install
- npm run build
- npm run dev

## Step 3 - Working
At this point, the dev environment should show you a URL localhost:5000 or localhost:xxxx
Follow this link to launch the UI. By default, you should see three accounts added. These are not validated accounts. 

### Step 3.1 - Adding and monitoring an account.
You may add a real account here like so.
- Click "Add Account"
- Paste the account id into the edit box. Eg. atoi1qp9427varyc05py79ajku89xarfgkj74tpel5egr9y7xu3wpfc4lkpx0l86
- Press "Ok"

At this point you should see your account listed, you may need to scroll the middle pannel to view the accounts and their balances.
Follow the same steps to add another account. The account info is polled via tangle-connect every 20 seconds.

### Step 3.2 - Filtering amounts.
The text box provided just above account listings is our filter box. This filter box works for filtering both amount and id. To match the amount ensure that you add only numbers. All the account balances matching the value in the filter box will be displayed.

### Step 3.3 - Filtering accounts.
To filter based on account ids, simply type a partial account id. All the accounts with these matching partial strings will be displayed.

### Step 3.4 - Removing an account.
To remove an account simply click on the remove button provided with each account.

### Step 3.5 - View total balance.
The total balance and the number of accounts displayed are always seen on the top of the filter box. This information is dynamic and as you filter the account you will see this value also getting updated.

Features
1. Add accounts
2. Remove account
3. Show current balance
4. Filter on balance and account key
5. Show the total balance of the filtered accounts.
6. Balances are updated every 15 sec.

Stack
1. Typescript
2. Svelte
3. sveltestrap + bootstrap
4. iota.js
5. zeromq - Untested as the server is down.

Modules
1. tangle-cruiser:  UI that connects to API for the intended outcome
2. tangle-connect: API to connect with tangle


What needs to be worked on
1. Better look and feel
2. Server configuration thru UI
3. Test driven or test framework
4. Language support not completed
5. Better API to general usage.

