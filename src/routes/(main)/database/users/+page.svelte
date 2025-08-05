<script lang="ts">
    import { goto } from "$app/navigation";
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import * as Pagination from "$lib/components/ui/pagination/index.js";

    export let data;

    $: currentPage = data.page;

    function changePage(newPage: number) {
        const params = new URLSearchParams({
            page: newPage.toString()
        });

        goto(`?${params.toString()}`);
    }
</script>

<div class="flex flex-row justify-center">
    <DataTable data={data.data} {columns} />
</div>



<div class="flex flex-row justify-center fixed bottom-4">
    <Pagination.Root count={data.total} perPage={10} class="">
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton onclick={() => changePage(currentPage - 1)} disabled={currentPage <= 1}/>
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value} onclick={() => changePage(page.value)}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton onclick={() => changePage(currentPage + 1)} disabled={currentPage >= Math.ceil(data.total / 10)}/>
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
</div>


