<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
    } from "$lib/components/ui/alert-dialog";

    import { goto } from "$app/navigation";
    import { qr } from "@svelte-put/qr/svg";

    let showalert: boolean = false;
    let showqr: boolean = false;

    let threshold: number = 4;

    import {
        Check,
        X,
        Menu,
        LogOut,
        ChartBarBig,
        Stamp,
        ShieldUser,
        Mars,
        Lectern,
        Star,
        User,
        CircleDashed,
        TicketCheck,
    } from "@lucide/svelte";

    export let data;

    const reset = () => {
        showalert = false;
    };

    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: "GET",
            headers: {},
        });
        if (res) {
            goto("/");
        }
    };

    const navigate = (page: string) => {
        goto(`/${page}`);
    };
</script>

<div class="min-h-screen bg-border font-[sarabun]">
    <div
        class="sticky top-0 p-2 backdrop-blur-sm flex flex-row-reverse border-slate-200 border-1"
    >
        <Sheet.Root>
            <Sheet.Trigger><Menu size={36} /></Sheet.Trigger>

            <Sheet.Content side="right" class="font-[sarabun]">
                <Sheet.Header>
                    <Sheet.Title>EVENTUS x ALiCE</Sheet.Title>
                    <Sheet.Description>
                        Authenticated Log in Checker For Eventus
                    </Sheet.Description>
                    {#if data.role == "ADMIN" || data.role == "MOD"}
                        <Separator />
                        <div
                            class="flex flex-row text-left justify-center gap-2"
                        >
                            <Button
                                variant="default"
                                class="border-1 border-amber-800 duration-300 text-amber-800 bg-amber-200 hover:bg-amber-500"
                                onclick={() => {navigate("approve")}}
                            >
                                <Stamp /> ตรวจฐาน
                            </Button>
                            <Button
                                variant="default"
                                class="border-1 border-amber-800 duration-300 text-amber-800 bg-amber-200 hover:bg-amber-500"
                                onclick={() => {navigate("approve")}}
                            >
                                <ChartBarBig /> สถิติ
                            </Button>
                        </div>
                    {:else}
                        <div></div>
                    {/if}

                    <Separator />
                    <div class="flex flex-col text-left">
                        <Button
                            variant="link"
                            size="lg"
                            onclick={() => {
                                showqr = true;
                            }}>เช็กอินฐาน</Button
                        >
                        <Button variant="link" size="lg" onclick={() => {navigate("about")}}>เกี่ยวกับ</Button>
                        <Button variant="link" size="lg">เกียรติบัตร</Button>
                    </div>
                    <Separator />
                    <div class="absolute bottom-0 p-2">
                        <Button
                            variant="default"
                            class="w-full transition border-1 border-rose-800 duration-300 text-rose-800 bg-rose-200 hover:bg-rose-500"
                            onclick={() => {
                                showalert = true;
                            }}
                        >
                            <LogOut />ออกจากระบบ
                        </Button>
                    </div>
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    </div>
    <div class="flex flex-col max-w-[400px] justify-self-center">
        <Card.Root class="flex p-8 m-4 bg-card border-ring">
            <Card.Header class="flex flex-col items-center text-center">
                <Card.Title class="font-medium text-4xl"
                    >สวัสดี, {data.prefix} {data.name} {data.surname}</Card.Title
                >
                <div class="justify-between flex flex-row gap-2">
                    {#if data.role == "ADMIN"}
                        <Badge
                            class="bg-amber-200 text-amber-700 border-amber-700 m-4"
                        >
                            <ShieldUser />ผู้ดูแลระบบ
                        </Badge>
                    {:else if data.role == "MOD"}
                        <Badge
                            class="bg-teal-200 text-teal-700 border-teal-700 m-4"
                        >
                            <Lectern />พี่ฐาน
                        </Badge>
                    {:else}
                        <Badge
                            class="bg-cyan-200 text-cyan-700 border-cyan-700 m-4"
                        >
                            <User />นักเรียน
                        </Badge>
                    {/if}

                    {#if data.baseNum == data.doneNum}
                        <Badge
                            class="bg-emerald-200 text-emerald-700 border-emerald-700 m-4"
                        >
                            <Star /> ทำครบทุกฐาน
                        </Badge>

                    {:else if data.doneNum >= threshold}
                    <Badge
                            class="bg-indigo-200 text-indigo-700 border-indigo-700 m-4"
                        >
                            <TicketCheck /> ได้รับเกียรติบัตร
                        </Badge>
                    {:else}
                        <Badge
                            class="bg-rose-200 text-rose-700 border-rose-700 m-4"
                        >
                            <CircleDashed /> ยังทำไม่ครบ
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
                                        <Badge
                                            class="bg-emerald-200 text-emerald-700 border-emerald-700 m-1 w-8 h-8"
                                        >
                                            <Check size={8} />
                                        </Badge>
                                    {:else}
                                        <Badge
                                            class="bg-rose-200 text-rose-700 border-rose-700 m-1 w-8 h-8"
                                        >
                                            <X size={8} />
                                        </Badge>
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
        <AlertDialog open={showalert}>
            <AlertDialogContent class="w-75 font-[sarabun]">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center">
                        คุณต้องการที่จะออกจากระบบหรือไม่
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div class="flex flex-row justify-around gap-2">
                        <Button
                            onclick={logout}
                            variant="default"
                            type="submit"
                            class="transition border-1 border-emerald-800 duration-300 text-emerald-800 bg-emerald-200 hover:bg-emerald-500"
                            >Ok</Button
                        >
                        <Button
                            onclick={reset}
                            variant="default"
                            type="submit"
                            class="transition border-1 border-rose-800 duration-300 text-rose-800 bg-rose-200 hover:bg-rose-500"
                            >Cancel</Button
                        >
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showqr}>
            <AlertDialogContent class="w-75 font-[sarabun]">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center">
                        เอาอันนี้ให้พี่ฐานดู
                    </AlertDialogTitle>
                    <AlertDialogDescription class="text-center">
                            กรุณาปรับหน้าจอให้สว่าง
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <svg
                        width="250"
                        use:qr={{
                            data: JSON.stringify({
                                id: data.studentId,
                                created: Date.now().toString(),
                            }),
                            shape: "circle",
                        }}
                    />
                </div>
                <AlertDialogFooter>
                    <div class="flex flex-row justify-around gap-2">
                        <AlertDialogDescription>
                            QR Code มีอายุ 5 นาที
                        </AlertDialogDescription>
                        <Button
                            onclick={() => {
                                showqr = false;
                            }}
                            variant="default"
                            type="submit"
                            class="transition border-1 border-slate-600 duration-300 text-slate-600 bg-slate-200 hover:bg-slate-400"
                            >ปิด</Button
                        >
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</div>
