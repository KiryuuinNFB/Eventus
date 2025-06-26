<script lang="ts">
    import qr from "$lib/assets/download.png";

    export let data

</script>

<div class="centerdiv">
    <div class="content">
        <div class="contentbox">
            <h1 class="bigtopic">สวัสดีคุณ {data.name} {data.surname}</h1>
            <p>มีฐานทั้งหมด {data.baseNum} ฐาน</p>
        </div>
        <div class="contentbox">
            <div class="centerdiv">
                <img src={qr} alt="qrcode" width="180">
            </div>
        </div>
        {#each data.events as event}
            <div class="contentbox">
                <h3>{event.name}</h3>
                <p>{event.desc}</p>
                <p>ฐานอยู่ที่ : {event.location}</p>
                {#if event.completed == true}
                <p>สถานะการทำ : ✔️</p>
                {:else}
                <p>สถานะการทำ : ❌</p>
                {/if}
            </div>
        {/each}
    </div>
</div>
