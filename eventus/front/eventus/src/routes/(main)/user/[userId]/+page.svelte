<script lang="ts">
    import qr from "$lib/assets/download.png";

    export let data

</script>

<div class="centerdiv">
    <div class="content">
        <div class="contentbox">
            <h2 class="bigtopic">สวัสดีคุณ {data.name} {data.surname}</h2>
            <p>มีฐานทั้งหมด {data.baseNum} ฐาน ทำไปแล้ว {data.doneNum} ฐาน</p>
            <p>เหลืออีก {data.baseNum - data.doneNum} ฐาน</p>
            <div class="menubuttondiv">
                <button class="menubutton">เช็คอินฐาน</button>
                <button class="menubutton">เกี่ยวกับ</button>
                <button class="menubutton">ออกจากระบบ</button>
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
