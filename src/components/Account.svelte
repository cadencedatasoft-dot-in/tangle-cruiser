<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { AccountType } from "../utils/types";
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
  } from "sveltestrap";

  export let account: AccountType;

  const dispatch = createEventDispatcher();

  //Dispatch message to parent for removal of account 
  function onRemove() {
    dispatch("remove", account); // emit remove event
  }
</script>

<Card class="mb-0 shadow p-3 bg-white rounded ">
  <CardHeader>
    <CardTitle>Account #{account.id}</CardTitle>
  </CardHeader>
  <CardBody>
    <CardSubtitle>Account: {account.key}</CardSubtitle>
    <CardText>
      Balance: {account.amount}
    </CardText>
    <Button on:click={onRemove}>Remove</Button>
  </CardBody>
</Card>
