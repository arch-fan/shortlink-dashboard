<script lang="ts">
  import type { ILinks } from "@/models/links.types";
  import AddSiteModal from "./AddSiteModal.svelte";
  import LinkCard from "./LinkCard.svelte";

  let modal = $state<any>();

  let search = $state<string>("");

  const { links } = $props<{ links: ILinks[] | undefined }>();
  let linksState = $state<ILinks[] | undefined>(links);

  function filterLinks() {
    console.log(search);

    if (search !== "" && links) {
      const filteredLinks = links.filter((link) => {
        for (const v of Object.values(link)) {
          if (v.toString().toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
        }
      });
      linksState = filteredLinks;
    } else {
      linksState = links;
    }
  }
</script>

<main class="flex flex-col w-full p-2">
  <div class="flex w-full gap-4">
    <input
      type="search"
      class="rounded bg-primary-item border border-primary-border focus:border-primary-highlight focus:bg-transparent outline-none w-full p-1"
      placeholder="Search..."
      bind:value={search}
      on:input={filterLinks}
    />
    <button
      class="bg-[#ededed] hover:bg-opacity-80 py-2 px-8 rounded text-black font-bold"
      on:click={() => modal.openModal()}>Add</button
    >
    <AddSiteModal bind:this={modal} />
  </div>
  <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
    {#if linksState && linksState.length > 0}
      {#each linksState as link}
        <LinkCard {...link} />
      {/each}
    {:else}
      <p>No links found</p>
    {/if}
  </div>
</main>
