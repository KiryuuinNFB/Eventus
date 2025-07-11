<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    import { goto } from "$app/navigation";
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
        goto(`/approve`);
    };
</script>

<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex flex-col max-w-[400px] justify-self-center">
        <Card.Root class="flex p-8 m-4 mt-16 bg-card border-ring">
            <Card.Header class="flex flex-col items-center text-center">
                <Card.Title class="font-medium text-4xl"
                    >สวัสดี, {data.name} {data.surname}</Card.Title
                >
                {#if data.role == "ADMIN"}
                <div class="justify-between">
                    <Badge class="bg-amber-200 text-amber-700 border-amber-700 m-4">
                        ผู้ดูแลระบบ
                    </Badge>
                </div>
                    
                {:else}
                    <div class="justify-between">
                    <Badge class="bg-cyan-200 text-cyan-700 border-cyan-700 m-4">
                        ผู้ใช้
                    </Badge>
                </div>
                {/if}
            </Card.Header>
            <Card.Content>
                มีทั้งหมด {data.baseNum} ฐาน ทำไปแล้ว {data.doneNum} ฐาน เหลืออีก
                {data.baseNum - data.doneNum} ฐาน
            </Card.Content>
        </Card.Root>

        <Card.Root class="flex p-8 m-4 bg-card border-ring">
            <Card.Content>
                <Accordion.Root type="multiple" class="w-full">
                    {#each data.events as event}
                        <Accordion.Item
                            value={event.id.toString()}
                            class="text-left"
                        >
                            <Accordion.Trigger>
                                {event.name}
                            </Accordion.Trigger>
                            <Accordion.Content
                                class="flex flex-col gap-4 text-balance"
                            >
                                <p>{event.desc}</p>
                                <p>ฐานอยู่ที่ : {event.location}</p>
                            </Accordion.Content>
                        </Accordion.Item>
                    {/each}
                </Accordion.Root>
            </Card.Content>
        </Card.Root>
    </div>
</div>
