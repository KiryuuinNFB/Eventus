<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { House } from "@lucide/svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

    import { goto } from "$app/navigation";
    import { API_ELYSIA } from "$lib/config.js";

    export let data;

    const home = () => {
        goto(`/user/${data.user}`);
    };

    

    

</script>

<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <div
            class="absolute top-0 p-2 backdrop-blur-sm flex flex-row border-slate-200 border-1"
        >
            <Button
                onclick={home}
                variant="default"
                type="submit"
                class="transition border-1 border-slate-600 duration-300 text-slate-600 bg-slate-200 hover:bg-slate-400"
                ><House />Home</Button
            >
        </div>
        <div class="flex flex-col max-w-[400px] justify-self-center">
            <img src={`${API_ELYSIA}/`} alt="cert" width="800" />
        </div>
    </div>
</div>
