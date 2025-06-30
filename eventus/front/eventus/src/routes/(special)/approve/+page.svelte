<script lang="ts">
    import { onMount } from "svelte";
    import { Html5Qrcode } from "html5-qrcode";

    let scanning = false

    let html5Qrcode: Html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { 
                    width: 250,
                    height: 250
                },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText: any, decodedResult: any) {
        alert(decodedText)
        console.log(decodedResult)
    }

    function onScanFailure(error: any) {
        console.log('no qr found')
    }


</script>

<main class="content">
    <reader id="reader"></reader>
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }
</style>