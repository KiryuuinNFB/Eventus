<script lang="ts">
    import { onMount } from "svelte";
    import { Html5Qrcode } from "html5-qrcode";
    import { Modal, Content, Trigger } from "sv-popup";

    let scanning = false

    let close = true

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
        const parsedText = JSON.parse(decodedText)
        alert(parsedText.id + parsedText.created)
    }

    function onScanFailure(error: any) {
        console.log('no qr found')
    }


</script>

<main class="content">
    <reader id="reader"></reader>
    {#if scanning}
        <button on:click={stop} class="menubutton">stop</button>
    {:else}
        <button on:click={start} class="menubutton">start</button>
    {/if}
    <div>
        
    </div>
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
        width: 80vw;
        height: 80vw;
        min-height: 500px;
        background-color: rgb(66, 66, 66);
    }
</style>