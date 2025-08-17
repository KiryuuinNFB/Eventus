<script lang="ts">
    let sitetitle = "เกียรติบัตร";
	import Heading from "../../head.svelte"

    import { Button } from "$lib/components/ui/button/index.js";
    import { House, Download } from "@lucide/svelte";

    import { goto } from "$app/navigation";

    export let data;

    const home = () => {
        goto(`/user/${data.user}`);
    };


    const downloadCert = async () => {
        const res = await fetch(`/api/cert/${data.user}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `cert-${data.user}.png`; // filename
        link.click();

        URL.revokeObjectURL(url);
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
        
        <div class="flex flex-col max-w-[400px] justify-around">
            <img src={"/api/cert"} alt="cert" width="800" class="mt-16 mb-4"/>
            <Button onclick={downloadCert} variant="default" class="w-48 transition border-1 border-indigo-600 duration-300 text-indigo-600 bg-indigo-200 hover:bg-indigo-400"><Download />ดาวน์โหลดเกียรติบัตร</Button>
        </div>
        
    </div>
    
</div>