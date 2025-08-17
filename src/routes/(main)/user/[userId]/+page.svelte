<script lang="ts">
    import Heading from "../../../head.svelte";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import home from "$lib/assets/home.png";
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
    let showalert2: boolean = false;
    let showqr: boolean = false;

    export let data;

    let threshold: number = 3;

    let qrcode: string = generateQrData();

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
        RotateCw,
        Database,
    } from "@lucide/svelte";
    import { PRISMA_STUDIO } from "$lib/config";

    const reset = () => {
        showalert = false;
    };

    const reset2 = () => {
        showalert2 = false;
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

    const gotoprisma = () => {
        window.location.href = PRISMA_STUDIO;
    };

    function generateQrData() {
        return JSON.stringify({
            id: data.studentId,
            created: Date.now().toString(),
        });
    }

    function refreshQR() {
        qrcode = generateQrData();
    }

    const certificateCheck = () => {
        if (data.doneNum >= threshold) {
            goto("/certificate");
        } else {
            showalert2 = true;
            return;
        }
    };

    let sitetitle = "งานวันวิทยาศาสตร์";
</script>

<Heading SiteHead={sitetitle} />

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
                        Authenticated Log in Checker for Eventus
                    </Sheet.Description>

                    {#if data.role == "ADMIN"}
                        <Separator />
                        <div
                            class="flex flex-row text-left justify-center gap-2"
                        >
                            <Button
                                variant="default"
                                class="border-1 border-amber-800 duration-300 text-amber-800 bg-amber-200 hover:bg-amber-500"
                                onclick={() => {
                                    navigate("database");
                                }}
                            >
                                <Database /> ฐานข้อมูล
                            </Button>
                        </div>
                    {/if}
                    {#if data.role == "ADMIN" || data.role == "MOD"}
                        <div
                            class="flex flex-row text-left justify-center gap-2"
                        >
                            <Button
                                variant="default"
                                class="border-1 border-teal-800 duration-300 text-teal-800 bg-teal-200 hover:bg-teal-500"
                                onclick={() => {
                                    navigate("approve");
                                }}
                            >
                                <Stamp /> ตรวจฐาน
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
                            }}>หน้า Home</Button
                        >
                        <Button
                            variant="link"
                            size="lg"
                            onclick={() => {
                                navigate("about");
                            }}>เกี่ยวกับ</Button
                        >
                        <Button
                            variant="link"
                            size="lg"
                            onclick={() => {
                                certificateCheck();
                            }}>เกียรติบัตร</Button
                        >
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
                    >สวัสดี, {data.prefix}
                    {data.name}
                    {data.surname}</Card.Title
                >
                <div class="justify-between flex flex-row">
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
                    {#if data.studentId == "22621"}
                        <Badge
                            class="bg-pink-200 text-pink-700 border-pink-700 m-4"
                        >
                            <Mars />เฟมบอย
                        </Badge>
                    {:else}
                        <div></div>
                    {/if}
                </div>
                {#if data.doneNum >= threshold}
                    
                        <Alert.Root
                            class="bg-indigo-200 text-indigo-700 border-indigo-700 m-1 p-1 gap-2"
                        >
                            <Alert.Title>คุณได้รับเกียรติบัตรแล้ว</Alert.Title>
                            <Alert.Description
                                class="text-indigo-500 flex flex-row text-left"
                            >
                                กด <Menu /> แล้วไปที่ "เกียรติบัตร" เพื่อรับเกียรติบัตร
                            </Alert.Description>
                        </Alert.Root>
                        <Alert.Root
                            class="bg-pink-200 text-pink-700 border-pink-700 m-1 p-1 gap-2"
                            onclick={() => {
                                window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSd08sHhKnP5YeiEThoXvZKneawxka6kV6aYgMn33fEki2r09A/viewform?usp=dialog"
                            }}
                        >
                            <Alert.Title>แบบสอบถามความพึงพอใจ</Alert.Title>
                            <Alert.Description
                                class="text-pink-500 flex flex-row text-left"
                            >
                                คลิกที่นี่เพื่อทำแบบสอบถามความพึงพอใจของระบบ
                            </Alert.Description>
                        </Alert.Root>
                    
                {:else}
                    <div></div>
                {/if}
            </Card.Header>
            <Card.Content>
                <div>
                    <h1 class="text-2xl text-center">
                        กิจกรรม {data.doneNum}/{data.baseNum}
                    </h1>
                </div>
                <p class="text-muted-foreground text-sm text-center">
                    QR Code มีอายุ 5 นาที
                </p>
                <div>
                    <svg
                        width="250"
                        use:qr={{
                            data: qrcode,
                            shape: "circle",
                        }}
                    />
                </div>
                <p class="text-muted-foreground text-sm text-center">
                    กรุณาปรับหน้าจอให้สว่าง
                </p>
                <Button variant="ghost" onclick={refreshQR}
                    ><RotateCw />Refresh</Button
                >
            </Card.Content>
        </Card.Root>

        <Card.Root class="flex p-4 m-4 bg-card border-ring">
            <Card.Content>
                <Accordion.Root type="multiple" class="w-full">
                    <h1 class="text-lg">กิจกรรม</h1>
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
                                            {event.name}
                                        </div>

                                        <p>{event.desc}</p>
                                        <p>อยู่ที่ : {event.location}</p>
                                        <p>อาจารย์ : {event.teacher}</p>
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
                <div>
                    <img src={home} alt="home" />
                </div>
                <AlertDialogFooter>
                    <div class="flex flex-row justify-around gap-2">
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

        <AlertDialog open={showalert2}>
            <AlertDialogContent class="w-55">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center"
                        >ยังทำกิจกรรมไม่ครบ</AlertDialogTitle
                    >
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        onclick={reset2}
                        variant="default"
                        type="submit"
                        class="transition border-1 border-emerald-800 duration-300 text-emerald-800 bg-emerald-200 hover:bg-emerald-500"
                        >Ok</Button
                    >
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</div>
