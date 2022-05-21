<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { AddAccountType } from "../utils/types";
  import { Input } from "sveltestrap";
  import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
  } from "sveltestrap";

  export let newKey: string = "";

  const dispatch = createEventDispatcher();

  //Dispatch message to parent for addition of new account 
  const updateAccounts = (value: AddAccountType) => {
    console.log(value);
    dispatch("updateacclist", value);
  };
</script>

<div>
  <form
    on:submit|preventDefault={() => {
      updateAccounts({ key: newKey, ok: true });
    }}
  >
    <Card class="mt-3 shadow p-3 mb-5 bg-white rounded">
      <CardHeader>
        <CardTitle>Add new account to check balance</CardTitle>
      </CardHeader>
      <CardBody>
        <Input
          bind:value={newKey}
          type="text"
          id="todo-0"
          autocomplete="off"
          class="mb-3"
        />
        <div class="btn-group">
          <button
            name="addaccbtn"
            type="button"
            class="btn btn__primary"
            value="false"
            on:click={() => {
              updateAccounts({ key: newKey, ok: false });
            }}
            >Cancel
          </button>
          <button
            name="addaccbtn"
            type="button"
            class="btn btn__primary"
            value="true"
            on:click={() => {
              updateAccounts({ key: newKey, ok: true });
            }}>Ok</button
          >
        </div>
      </CardBody>
    </Card>
  </form>
</div>
