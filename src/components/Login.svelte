<script lang="ts">
  let username = $state<string>();
  let password = $state<string>();
  let errorMessage = $state<string>();

  async function submit(
    e: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) {
    e.preventDefault();

    if (username && password) {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        errorMessage = error;
      }

      if (response.ok) {
        window.location.href = response.headers.get("location") || "/dashboard";
      }
    }
  }
</script>

<form on:submit={submit} class="w-full flex flex-col p-4">
  <label for="username">Username</label>
  <input bind:value={username} type="username" />
  <label for="password">Password</label>
  <input bind:value={password} type="password" id="password" name="password" />
  <button
    type="submit"
    class="bg-white text-black w-fit self-center py-2 px-4 font-bold hover:bg-gray-200 rounded"
    >Login</button
  >
  {#if errorMessage}
    <p class="text-red-500 text-center">{errorMessage}</p>
  {/if}
</form>

<style>
  form input {
    @apply w-full border p-1 bg-black outline-none mb-6 mt-2 rounded;
  }
</style>
