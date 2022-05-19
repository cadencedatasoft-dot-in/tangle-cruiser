<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { FormGroup, Input, Label } from "sveltestrap";

  let filtertext = "";
  const dispatch = createEventDispatcher();
  function filterAccounts(e: Event) {
    let val = (e.target as HTMLInputElement).value.trim();
    let succcess = dispatch("filteracc", val);
    console.log(val)
    return succcess;
  }
</script>

<form
on:submit|preventDefault={filterAccounts}
>
  <label for="node">Filter on account or amount</label>
  <input
    bind:value={filtertext}
    type="text"
    id="todo"
    autocomplete="off"
    class="input input__lg"
    on:keypress={filterAccounts}
  />
</form>
