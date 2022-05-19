<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let accounts: {
    id: number;
    key: string;
    amount: number;
  }[];

  const dispatch = createEventDispatcher();
  const showDialog = () => dispatch("showdlg", accounts);
</script>

<div class="col col-lg-2">
  <button type="button" class="btn btn__primary" on:click={showDialog}>
    Add Account
  </button>
</div>
