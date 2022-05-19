<!-- Accounts.svelte -->
<script lang="ts">
  // import FilterButton from "./FilterButton.svelte";
  import Account from "./Account.svelte";
  import MoreActions from "./MoreActions.svelte";
  import AddAccount from "./AddAccount.svelte";
  import type {
    AddAccountType,
    AccountsType,
    AccountType,
  } from "../utils/types";
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
  } from "sveltestrap";
  import Filter from "./Filter.svelte";

  export let accounts: AccountsType = [];

  let showaddaccount: boolean = false;
  let newAccId: number;

  $: filterstr = "";
  $: totalaccounts = accounts.length;
  $: totalamount = 0;
  $: {
    if (totalaccounts === 0) {
      newAccId = 1;
    } else {
      newAccId = Math.max(...accounts.map((t) => t.id)) + 1;
    }
  }

  function removeAccount(account: AccountType) {
    accounts = accounts.filter((t) => t.id !== account.id);
  }

  function validateKey(newkey: string) {
    if (newkey.length) {
      //Further validation
      return true;
    }
    return false;
  }

  function addAcc(newkey: CustomEvent<AddAccountType>) {
    if (newkey && newkey.detail && newkey.detail) {
      let detail: AddAccountType = newkey.detail;
      if (detail.ok) {
        let key = detail.key;
        if (validateKey(key)) {
          accounts = [
            ...accounts,
            { id: newAccId, key: detail.key, amount: 0 },
          ];
        }
      }
    }
    accounts = accounts;
    showaddaccount = false;
  }

  const filterAccounts = (filterstr: string) => {
    if (filterstr !== "") {
      console.log("FA :" + filterstr);
      let accs = accounts.filter(
        (ele) =>
          (ele.amount === parseInt(filterstr) ? true : false) ||
          ele.key.includes(filterstr)
      );
      console.log(accs);
      return accs;
    } else {
      return accounts;
    }
  };

  const filterCriteria = (event: CustomEvent<string>) => {
    if (event && event.detail) {
      filterstr = event.detail;
      console.log(filterstr);
      accounts = accounts;
    }
  };

  function updateAccount(account: AccountType) {
    const i = accounts.findIndex((t) => t.id === account.id);
    accounts[i] = { ...accounts[i], ...account };
  }

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
        >Total balance in these {totalaccounts} accounts is {totalamount}</CardSubtitle
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
          <li class="todo">
            <div class="row justify-content-md-center">
              <div class="col">
                <Account
                  {account}
                  on:update={(e) => updateAccount(e.detail)}
                  on:remove={(e) => removeAccount(e.detail)}
                />
              </div>
            </div>
          </li>
        {:else}
          <li>Nothing to do here!</li>
        {/each}
      </ul>
    </div>
    {#if showaddaccount}
      <AddAccount on:updateacclist={addAcc} />
    {/if}
  </div>
  <MoreActions {accounts} on:showdlg={showAddAccount} />
</div>
