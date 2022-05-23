<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let accounts: {
    id: number;
    key: string;
    amount: number;
  }[];

  const dispatch = createEventDispatcher();

  //Dispatch message to parent for showing add new account card 
  const showDialog = () => dispatch("showdlg", accounts);
</script>

<div class="mt-3 col col-lg-3">
  <button type="button" class="btn btn__primary" on:click={showDialog}>
    Add Account
  </button>
</div>
