<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";

    import { goto } from "$app/navigation";
    import { qr } from "@svelte-put/qr/svg";

    import { Check, X, Menu } from "@lucide/svelte";

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
    <div class="sticky top-0 p-2 backdrop-blur-sm">
        <Sheet.Root>
            <Sheet.Trigger><Menu size={32}/></Sheet.Trigger>
            <Sheet.Content class="backdrop-blur-sm">
                <Sheet.Header>
                    <Sheet.Title>EVENTUS</Sheet.Title>
                    <Sheet.Description>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, rem.
                    </Sheet.Description>
                    
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    </div>
    <div class="flex flex-col max-w-[400px] justify-self-center">
        <div></div>
        <Card.Root class="flex p-8 m-4 bg-card border-ring">
            <Card.Header class="flex flex-col items-center text-center">
                <Card.Title class="font-medium text-4xl"
                    >สวัสดี, {data.name} {data.surname}</Card.Title
                >
                <div class="justify-between">
                    {#if data.role == "ADMIN"}
                        <Badge
                            class="bg-amber-200 text-amber-700 border-amber-700 m-4"
                        >
                            ผู้ดูแลระบบ
                        </Badge>
                    {:else}
                        <Badge
                            class="bg-cyan-200 text-cyan-700 border-cyan-700 m-4"
                        >
                            นักเรียน
                        </Badge>
                    {/if}
                    {#if data.baseNum == data.doneNum}
                        <Badge
                            class="bg-emerald-200 text-emerald-700 border-emerald-700 m-4"
                        >
                            ทำครบทุกฐาน
                        </Badge>
                    {:else}
                        <Badge
                            class="bg-rose-200 text-rose-700 border-rose-700 m-4"
                        >
                            ยังทำไม่ครบ
                        </Badge>
                    {/if}
                </div>
            </Card.Header>
            <Card.Content>
                มีทั้งหมด {data.baseNum} ฐาน ทำไปแล้ว {data.doneNum} ฐาน เหลืออีก
                {data.baseNum - data.doneNum} ฐาน
            </Card.Content>
        </Card.Root>

        <Card.Root class="flex p-4 m-4 bg-card border-ring">
            <Card.Content>
                <Accordion.Root type="multiple" class="w-full">
                    <h1 class="text-lg">ฐาน</h1>
                    {#each data.events as event}
                        <Accordion.Item
                            value={event.id.toString()}
                            class="text-left"
                        >
                            <Accordion.Trigger>
                                <div class="text-lg flex flex-row gap-2">
                                    {#if event.completed == true}
                                        <Check />
                                    {:else}
                                        <X />
                                    {/if}
                                    {event.name}
                                </div>
                            </Accordion.Trigger>
                            <Accordion.Content
                                class="flex flex-col gap-4 text-balance"
                            >
                                <Card.Root>
                                    <Card.Content>
                                        <div class="text-lg">
                                            ฐาน {event.name}
                                        </div>

                                        <p>{event.desc}</p>
                                        <p>อยู่ที่ : {event.location}</p>
                                    </Card.Content>
                                    <Card.Footer>
                                        <p class="text-muted-foreground">
                                            ID: {event.id}
                                        </p>
                                    </Card.Footer>
                                </Card.Root>
                            </Accordion.Content>
                        </Accordion.Item>
                    {/each}
                </Accordion.Root>
            </Card.Content>
        </Card.Root>
    </div>
</div>
