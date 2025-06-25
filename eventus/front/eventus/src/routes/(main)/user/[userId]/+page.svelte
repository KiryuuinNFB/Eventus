<script lang="ts">
    import qr from "$lib/assets/download.png";

    export let data

</script>

<div class="centerdiv">
    <div class="content">
        <div class="contentbox">
            <h1 class="bigtopic">สวัสดีคุณ {data.name} {data.surname}</h1>
            <p>ID : {data.studentId}</p>
        </div>
        <div class="contentbox">
            <div class="centerdiv">
                <img src={qr} alt="qrcode">
            </div>
        </div>
        {#each data.events as event}
            <div class="contentbox">
                <h3>{event.name}</h3>
                <p>{event.desc}</p>
                <p>ฐานอยู่ที่ : {event.location}</p>
                <p>สถานะการทำ : {event.completed}</p>
            </div>
        {/each}
    </div>
</div>
