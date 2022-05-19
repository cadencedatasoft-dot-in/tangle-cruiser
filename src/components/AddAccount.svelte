<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { AddAccountType } from "../utils/types";
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
  } from "sveltestrap";

  export let newKey: string = "";

  const dispatch = createEventDispatcher();
  const updateAccounts = (value: AddAccountType) =>
    dispatch("updateacclist", value);
</script>

<div>
  <form
    on:submit|preventDefault={() => {
      updateAccounts({ key: newKey, ok: true });
    }}
  >
    <Card class="mb-3 shadow p-3 mb-5 bg-white rounded">
      <CardHeader>
        <CardTitle>Add new account to check balance</CardTitle>
      </CardHeader>
      <CardBody>
        <input
          bind:value={newKey}
          type="text"
          id="todo-0"
          autocomplete="off"
          class="input input__lg"
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
