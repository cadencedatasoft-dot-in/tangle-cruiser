<script lang="ts">
  import Account from "./Account.svelte";
  import MoreActions from "./MoreActions.svelte";
  import AddAccount from "./AddAccount.svelte";
  import Filter from "./Filter.svelte";
  import type {
    AddAccountType,
    AccountsType,
    AccountType,
  } from "../utils/types";
  import {
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardTitle,
  } from "sveltestrap";
  import { getBalance } from "tangle-connect";
  import { onMount } from "svelte";

  export const API_ENDPOINT =
    "https://api.lb-0.h.chrysalis-devnet.iota.cafe:443";

  export let accounts: AccountsType = [];

  const POLLING_INTERVEL = 20000;
  let showaddaccount: boolean = false;
  let newAccId: number;

  $: filterstr = "";
  $: filteredtotal = accounts.length;
  $: totalaccounts = accounts.length;
  $: filteredtotalamount = 0;
  $: {
    if (totalaccounts === 0) {
      newAccId = 1;
    } else {
      newAccId = Math.max(...accounts.map((t) => t.id)) + 1;
    }
  }

  //Poll each account for updated balance
  function pollandUpdate(): void {
    accounts.forEach((acc) => {
      getBalance(acc.key)
        .then((bal) => {
          if (bal) {
            if (acc.amount !== bal) {
              acc.amount = bal;
            }
          }
        })
        .catch(() => {
          console.log("Non valid address");
        });
    });
    accounts = accounts;
  }

  onMount(async () => {
    setInterval(pollandUpdate, POLLING_INTERVEL);
  });

  //Remove account from the accounts list
  function removeAccount(account: AccountType): void {
    accounts = accounts.filter((t) => t.id !== account.id);
  }

  //Once the user adds a new account, verify the account key is valid 
  function validateKey(newkey: string): boolean {
    if (newkey.length) {
      let rexp = new RegExp("[a-z0-9]");
      if (rexp.test(newkey)) {
        let obj = accounts.find((o) => o.key === newkey);
        if (!obj) {
          return true;
        }
      }
    }
    return false;
  }

  //Fetch balance from the network and then add the account to the list
  async function addAcc(newkey: CustomEvent<AddAccountType>) {
    if (newkey && newkey.detail && newkey.detail) {
      let detail: AddAccountType = newkey.detail;
      if (detail.ok) {
        let key = detail.key.trim();
        if (validateKey(key)) {
          getBalance(key)
            .then((bal) => {
              let newacc: AccountType = {
                id: newAccId,
                key: key,
                amount: bal ? bal : 0,
              };
              accounts = [...accounts, newacc];
            })
            .catch(() => {
              let newacc: AccountType = { id: newAccId, key: key, amount: 0 };
              accounts = [...accounts, newacc];
            });
        }
      }
    }
    filterstr = filterstr;
    accounts = accounts;
    showaddaccount = false;
  }

  //Use filter text to lookup keys and balances and return only matching
  const filterAccounts = (filterstr: string) => {
    if (filterstr !== "") {
      let accs = accounts.filter(
        (ele) =>
          (ele.amount === parseInt(filterstr) ? true : false) ||
          ele.key.includes(filterstr)
      );
      filteredtotalamount = 0;
      accs.forEach((acc) => {
        filteredtotalamount += acc.amount;
      });
      filteredtotal = accs.length;
      return accs;
    } else {
      filteredtotalamount = 0;
      accounts.forEach((acc) => {
        filteredtotalamount += acc.amount;
      });
      filteredtotal = accounts.length;
      return accounts;
    }
  };

  //Capture filter text
  const filterCriteria = (event: CustomEvent<string>) => {
    if (event && event.detail) {
      filterstr = event.detail;
      console.log(filterstr);
      accounts = accounts;
    }
  };

  //Show add account card
  function showAddAccount() {
    showaddaccount = true;
  }
</script>

<div class="todoapp stack-large">
  <Card class="mb-3 shadow p-3 mb-5 bg-white rounded">
    <CardHeader>
      <CardTitle>Your Accounts Balances</CardTitle>
    </CardHeader>
    <CardBody>
      <CardSubtitle
        >Total balance in these {filteredtotal} accounts is {filteredtotalamount}</CardSubtitle
      >
    </CardBody>
  </Card>
  <div class="overflow-auto mb-3 mb-md-0 mr-md-3 border p-3">
    <Filter on:filteracc={filterCriteria} />
    <div
      class="overflow-auto mb-3 mb-md-0 mr-md-3 border p-3"
      style="max-height: 280px;"
    >
      <ul class="todo-list stack-large" aria-labelledby="list-heading">
        {#each filterAccounts(filterstr) as account (account.id)}
        {((accounts) && accounts.length)? ' ': '_'}
          <li class="todo">
            <div class="row justify-content-md-center">
              <div class="col">
                <Account {account} on:remove={(e) => removeAccount(e.detail)} />
              </div>
            </div>
          </li>
        {:else}
          <li>Nothing to do here!</li>
        {/each}
      </ul>
    </div>
    <div class="row justify-content-md-center">
      {#if showaddaccount}
        <AddAccount on:updateacclist={addAcc} />
      {:else}
        <MoreActions {accounts} on:showdlg={showAddAccount} />
      {/if}
    </div>
  </div>
</div>
