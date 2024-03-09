<script lang="ts">
  import type { ILinks } from "@/models/links.types";
  import type { DeleteBody } from "@/controllers/links.types";

  const { id, name, link, created_at, updated_at } = $props<ILinks>();

  const windowUrl = `${window.location.origin}/${name}`;

  async function handleDel() {
    const body: DeleteBody = { id };

    const res = await fetch("/api/link", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      location.reload();
    }
  }

  function handleNewCopy(content: string) {
    navigator.clipboard.writeText(content);
  }
</script>

<div class="link__card">
  <a href={windowUrl} class="font-bold text-xl w-fit truncate max-w-[70%]">
    {name}
  </a>
  <p class="text-gray-300 text-xs truncate max-w-[70%]">{link}</p>
  <div class="controls">
    <!-- Copy New Link Button -->
    <button
      on:click={() => handleNewCopy(windowUrl)}
      title="Copy redirect link"
      class="hover:bg-green-500"
    >
      <svg viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1.5"
          d="M19.01 13.1c2.653-2.54 2.653-6.656 0-9.196c-2.652-2.539-6.953-2.539-9.606 0M7.918 17.807l7.89-7.553a2.253 2.253 0 0 0 0-3.284a2.503 2.503 0 0 0-3.43 0l-7.834 7.498a4.28 4.28 0 0 0 0 6.24c1.8 1.723 4.718 1.723 6.518 0l3.974-3.804M3 10.034L6.202 6.97"
        /></svg
      >
    </button>
    <!-- Copy Old Link Button -->
    <button
      on:click={() => handleNewCopy(link)}
      class="hover:bg-blue-400"
      title="Copy link where you are redirected"
    >
      <svg viewBox="0 0 512 512"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="m112 352l-64-64l64-64"
        /><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M64 288h294c58.76 0 106-49.33 106-108v-20"
        /></svg
      >
    </button>
    <!-- Delete Button -->
    <button
      on:click={handleDel}
      class="hover:bg-red-500"
      title="Delete the link"
    >
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
        />
      </svg>
    </button>
  </div>
  <div class="flex justify-between pt-4 text-xs text-gray-400">
    <time>Created: {created_at}</time>
    <time>Modified: {updated_at}</time>
  </div>
</div>

<style>
  .link__card {
    @apply border border-primary-border hover:border-primary-highlight rounded p-1 flex flex-col relative bg-primary-item transition-colors overflow-hidden;
  }

  .controls {
    @apply absolute grid grid-flow-col right-0 top-0 p-1 gap-1;
  }

  .controls button {
    @apply p-1 border border-primary-border rounded transition-colors;
  }

  .controls button svg {
    @apply h-6 w-6;
  }
</style>
