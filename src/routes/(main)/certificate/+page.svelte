<script lang="ts">
    let sitetitle = "เกียรติบัตร";
	import Heading from "../../head.svelte"

    import { Button } from "$lib/components/ui/button/index.js";
    import { House } from "@lucide/svelte";

    import { goto } from "$app/navigation";

    export let data;

    const home = () => {
        goto(`/user/${data.user}`);
    };

</script>

<Heading SiteHead={sitetitle}/>

<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <div
            class="absolute top-0 p-2 flex flex-row"
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
            <img src={"/api/cert"} alt="cert" width="800" class="mt-16"/>
        </div>
    </div>
</div>