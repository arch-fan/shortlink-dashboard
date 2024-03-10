<script lang="ts">
  import type { PostBody } from "@/controllers/links.types";

  let isOpen = $state(false);

  let name = $state<string>();
  let link = $state<string>();

  let errorMessage = $state<string>();

  export function openModal() {
    isOpen = true;
  }

  function closeModal() {
    isOpen = false;
  }

  async function handleSubmit(
    e: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) {
    e.preventDefault();
    if (name && link) {
      const newLink: PostBody = {
        name,
        link,
      };

      const res = await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });

      if (res.ok) {
        location.reload();
      } else {
        const { error } = await res.json();
        errorMessage = error;
      }
    }
  }
</script>

<div
  class={`w-screen top-0 z-50 modal
   left-0 h-screen backdrop-blur-sm grid place-items-center fixed bg-transparent p-2 ${isOpen ? "" : "hidden"}`}
  on:click|self={closeModal}
  aria-hidden="true"
>
  <div
    class="max-w-lg h-fit bg-black inset-0 m-auto w-full flex flex-col p-2 border border-primary-border text-white rounded"
    aria-hidden="true"
  >
    <h2 class="text-center text-xl">Add a Link</h2>
    <form on:submit={handleSubmit} class="flex flex-col gap-4 py-8">
      <input
        type="text"
        name="name"
        placeholder="Name"
        class="bg-primary-item focus:border-primary-highlight outline-none border border-primary-border rounded p-1"
        bind:value={name}
      />
      <input
        type="text"
        name="link"
        placeholder="Link"
        bind:value={link}
        class="bg-primary-item focus:border-primary-highlight outline-none border border-primary-border rounded p-1"
      />
      {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
      {/if}
      <input
        type="submit"
        value="Submit"
        class="bg-primary-highlight cursor-pointer hover:bg-opacity-80 text-black font-bold w-fit self-center py-2 px-4 rounded"
      />
    </form>
    <button
      on:click={closeModal}
      class="bg-primary-highlight text-black font-bold rounded hover:bg-opacity-80"
      >Close</button
    >
  </div>
</div>

<style>
  @keyframes appear {
    0% {
      scale: 0;
    }
    80% {
      scale: 1.1;
    }
    100% {
      scale: 1;
    }
  }

  .modal {
    animation: appear 0.2s ease-in-out;
  }
</style>
