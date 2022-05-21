<script lang="ts">
  import Accounts from "./components/Accounts.svelte";
  import type { AccountsType } from "./utils/types";

  //export

  let accounts: AccountsType = [
    { id: 0, key: "1Ank7jhneuBpaGiW7rLoKYAJr9xvmKyAvcBDFy4QpQJW4", amount: 0 },
    { id: 1, key: "1Ank7jhneuBpaGiW7rLoKYAJr9xvmKyAvcBDFy4QpQJW5", amount: 0 },
    { id: 2, key: "1Ank7jhneuBpaGiW7rLoKYAJr9xvmKyAvcBDFy4QpQJW6", amount: 0 },
  ];
</script>

<Accounts {accounts} />
