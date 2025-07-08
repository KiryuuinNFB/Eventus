<script lang="ts">
    import { goto } from "$app/navigation";
    import { Modal, Content, Trigger } from "sv-popup";
    import { qr } from "@svelte-put/qr/svg";
    export let data;

    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: "GET",
            headers: {},
        });
        if (res) {
            goto("/");
        }
    };

    const approve = () => {
        goto("/approve");
    };
</script>

<div class="centerdiv">
    <div class="content">
        <div class="contentbox">
            <h2 class="bigtopic">สวัสดีคุณ {data.name} {data.surname}</h2>
            <p>มีฐานทั้งหมด {data.baseNum} ฐาน ทำไปแล้ว {data.doneNum} ฐาน</p>
            <p>เหลืออีก {data.baseNum - data.doneNum} ฐาน</p>

            {#if data.role == "ADMIN"}
                <div class="centeradiv">
                    <button on:click={approve} class="menubutton">ตรวจฐาน</button>
                </div>
            {:else}
                <div></div>
            {/if}

            <div class="menubuttondiv">
                <Modal basic button={false}>
                    <Content>
                        <div class="centerdiv">
                            <div class="content">
                                <p>นำ QR Code ไปสแกนที่ฐาน</p>
                                <svg
                                    width="500"
                                    use:qr={{
                                        data: JSON.stringify({
                                            id: data.studentId,
                                            created: Date.now().toString(),
                                        }),
                                        shape: "square",
                                    }}
                                />
                            </div>
                        </div>
                    </Content>
                    <Trigger>
                        <button class="menubutton">เช็คอินฐาน</button>
                    </Trigger>
                </Modal>

                <button class="menubutton">เกี่ยวกับ</button>
                <Modal basic button={false}>
                    <Content>
                        <div class="centerdiv">
                            <div class="content">
                                <p>คุณแน่ใจหรือไม่ว่าจะออกจากระบบ</p>
                                <button on:click={logout} class="menubutton"
                                    >ออกจากระบบ</button
                                >
                            </div>
                        </div>
                    </Content>
                    <Trigger>
                        <button class="menubutton">ออกจากระบบ</button>
                    </Trigger>
                </Modal>
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
