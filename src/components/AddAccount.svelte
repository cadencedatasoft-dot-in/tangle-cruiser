<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { AddAccountType } from "../utils/types";

  export let newKey:string = "";

  const dispatch = createEventDispatcher();
  const updateAccounts = (value:AddAccountType) => dispatch("updateacclist", value);
</script>

<div>
  <form on:submit|preventDefault={() => {updateAccounts({key: newKey, ok: true})}}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg"> What needs to be done? </label>
    </h2>
    <input
      bind:value={newKey}
      type="text"
      id="todo-0"
      autocomplete="off"
      class="input input__lg"
    />
    <div class="btn-group">
      <button name="addaccbtn" type="button" class="btn btn__primary" value=false on:click={() => {updateAccounts({key: newKey, ok: false})}}
        >Cancel
      </button>
      <button name="addaccbtn" type="button" class="btn btn__primary" value=true on:click={() => {updateAccounts({key: newKey, ok: true})}}
        >Ok</button
      >
    </div>
  </form>
</div>
