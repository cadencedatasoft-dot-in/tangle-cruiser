<script lang="ts">
  import Accounts from "./components/Accounts.svelte";
import type { AccountsType } from "./utils/types";

  //export

  let accounts: AccountsType = [
    { id: 0, key: "232132312331111111111111111111123213231111", amount: 0 },
    { id: 1, key: "232132312331111111111111111111123213231112", amount: 0 },
    { id: 2, key: "232132312331111111111111111111123213231113", amount: 0 },
  ];
</script>

<Accounts {accounts} />
