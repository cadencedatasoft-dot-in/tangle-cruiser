<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Input, Label } from "sveltestrap";
  import { Card, CardBody } from "sveltestrap";

  let filtertext = "";
  const dispatch = createEventDispatcher();

  //Dispatch message to parent for filtering
  function filterAccounts(e: Event) {
    let succcess = false;
    let val = "";
    if ((e.target as HTMLInputElement).value) {
      val = (e.target as HTMLInputElement).value.trim();
      if (val !== "") {
        succcess = dispatch("filteracc", val);
      }
    }
    console.log(val);
    return succcess;
  }

  //Dispatch message to parent for resetting filter 
  function resetFilter(e: Event) {
    filtertext = "";
    const succcess = dispatch("filteraccreset", "");
    return succcess;
  }
</script>

<Card>
  <CardBody>
    <form on:submit|preventDefault={filterAccounts}>
      <Label class="">Filter on account or amount</Label>
      <div class="row">
        <div class="col">
          <Input
            bind:value={filtertext}
            type="text"
            id="todo"
            autocomplete="off"
            class="mb-3"
            on:keypress={filterAccounts}
          />
        </div>
      </div>
    </form>
  </CardBody>
</Card>
