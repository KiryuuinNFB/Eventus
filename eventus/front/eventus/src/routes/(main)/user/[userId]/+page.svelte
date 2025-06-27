<script lang="ts">
    import { goto } from '$app/navigation';


    export let data

    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: "GET",
            headers: {}
        })
        if (res) {
            goto("/")
        }
    }

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
                <button on:click={logout} class="menubutton">ออกจากระบบ</button>
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
