<!-- Accounts.svelte -->
<script lang="ts">
  // import FilterButton from "./FilterButton.svelte";
  import Account from "./Account.svelte";
  import MoreActions from "./MoreActions.svelte";
  import AddAccount from "./AddAccount.svelte";
  import type { AddAccountType, AccountsType, AccountType } from "../utils/types";

  export let accounts = [];

  let showaddaccount:boolean = false;
  let newAccId:number;
  let filter:string = "all";

  $: totalaccounts = accounts.length;
  $: totalamount = 0;
  $: {
    if (totalaccounts === 0) {
      newAccId = 1;
    } else {
      newAccId = Math.max(...accounts.map((t) => t.id)) + 1;
    }
  }

  function removeTodo(account: AccountType) {
    accounts = accounts.filter((t) => t.id !== account.id);
  }

  function validateKey(newkey:string) {
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
    showaddaccount = false;
  }

  const filterTodos = (filter:string, accs:AccountsType) =>
    filter === "active"
      ? accs.filter((t) => !t.amount)
      : filter === "amount"
      ? accs.filter((t) => t.amount)
      : accs;

  function updateTodo(account: AccountType) {
    const i = accounts.findIndex((t) => t.id === account.id);
    accounts[i] = { ...accounts[i], ...account };
  }

  function showAddAccount() {
    showaddaccount = true;
  }
</script>

<div class="todoapp stack-large">
  <h2 id="list-heading">
    Total balance in these {totalaccounts} accounts is {totalamount}
  </h2>

  <div
    class="overflow-auto mb-3 mb-md-0 mr-md-3 border p-3"
    style="max-height: 280px;"
  >
    <ul class="todo-list stack-large" aria-labelledby="list-heading">
      {#each filterTodos(filter, accounts) as account (account.id)}
        <li class="todo">
          <div class="row justify-content-md-center">
            <div class="col">
              <Account
                {account}
                on:update={(e) => updateTodo(e.detail)}
                on:remove={(e) => removeTodo(e.detail)}
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
  <MoreActions {accounts} on:showdlg={showAddAccount} />
</div>
