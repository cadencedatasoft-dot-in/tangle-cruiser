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

  function onRemove() {
    dispatch("remove", account); // emit remove event
  }
</script>

<Card class="mb-3 shadow p-3 mb-5 bg-white rounded ">
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
