<script lang="ts">
   import DataTable from "./data-table.svelte";
   import { columns } from "./columns.js";

   let { data } = $props();
</script>

<p class="text-4xl font-[sarabun]">
   bases 
</p>

<DataTable data={data.result} {columns} />
