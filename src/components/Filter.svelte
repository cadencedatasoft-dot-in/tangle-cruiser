<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Input, Label } from "sveltestrap";
  import {
    Card,
    CardBody,
  } from "sveltestrap";

  let filtertext = "";
  const dispatch = createEventDispatcher();
  function filterAccounts(e: Event) {
    let val = (e.target as HTMLInputElement).value.trim();
    let succcess = dispatch("filteracc", val);
    console.log(val);
    return succcess;
  }
</script>

<Card>
  <CardBody>
    <form on:submit|preventDefault={filterAccounts}>
      <Label class="">Filter on account or amount</Label>
      <Input
        bind:value={filtertext}
        type="text"
        id="todo"
        autocomplete="off"
        class="mb-3"
        on:keypress={filterAccounts}
      />
    </form>
  </CardBody>
</Card>
