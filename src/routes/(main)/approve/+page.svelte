<script lang="ts">
    let sitetitle = "ยืนยันฐาน";
	import Heading from "../../head.svelte"

    import * as Card from "$lib/components/ui/card/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
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

    import { onMount } from "svelte";
    import { Html5Qrcode } from "html5-qrcode";
    import { House } from "@lucide/svelte";

    import { goto } from "$app/navigation";
    type qrdata = {
        id: string;
        created: string;
    };

    type Base = {
        id: number;
        name: string;
        desc: string;
        location: string;
    };

    const { data } = $props();

    let user: string = $state("");
    let time: string = $state("");

    let value = $state("");

    const baseArr: Base[] = data["bases"];
    const triggerContent = $derived(
        baseArr.find((f: any) => f.id.toString() === value)?.name ??
            "เลือกกิจกรรม",
    );

    let scanning: boolean = $state(false);
    let showalert: boolean = $state(false);
    let showalert2: boolean = $state(false);

    let html5Qrcode: Html5Qrcode;

    let scanres: qrdata = $state({
        id: "",
        created: "",
    });

    const approve = async () => {
        const res = await fetch("api/approve", {
            method: "POST",
            headers: {},
            body: JSON.stringify({ user: user, base: value }),
        });
        const data = await res.json();
        return data;
    };

    onMount(init);

    const reset = () => {
        showalert = false;
    };

    const reset2 = () => {
        showalert2 = false;
    };

    const home = () => {
        goto(`/user/${data.user}`);
    };

    let success: string = $state("");

    const check_qr_age = (age: string) => {
        const ageInt = Number(age);
        const currentTime = Date.now();
        if (currentTime - ageInt <= 300000) {
            //qr code expires in 5 minutes
            return true;
        } else {
            return false;
        }
    };

    const approve_and_reset = async () => {
        showalert = false;
        if (!check_qr_age(time)) {
            success = "QR Code หมดอายุ";
            showalert2 = true;
            return;
        }
        const res = await approve();
        if (res.status !== 200) {
            if (res.status === 404) {
                success = "ไม่พบผู้ใช้";
                showalert2 = true;
                return;
            }
            success = "เคยยืนยันไปแล้ว";
            showalert2 = true;
            return;
        }
        success = "ยืนยันนักเรียนเรียบร้อยแล้ว";
        showalert2 = true;
    };

    function init() {
        html5Qrcode = new Html5Qrcode("reader");
    }

    function start() {
        html5Qrcode.start(
            { facingMode: "environment" },
            {
                fps: 12,
                qrbox: {
                    width: 250,
                    height: 250,
                },
            },
            onScanSuccess,
            onScanFailure,
        );
        scanning = true;
    }

    async function stop() {
        await html5Qrcode.stop();
        scanning = false;
    }

    function onScanSuccess(decodedText: any, decodedResult: any) {
        showalert = true;
        const parsedText = JSON.parse(decodedText);
        scanres = parsedText;
        user = scanres.id;
        time = scanres.created;
    }

    function onScanFailure(error: any) {
        console.log("no qr found");
    }

    function manualApprove() {
        showalert = true;
        time = Date.now().toString();
    }
</script>

<Heading SiteHead={sitetitle}/>


<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <div
            class="absolute top-0 p-2 backdrop-blur-sm flex flex-row border-slate-200 border-1"
        >
            <Button
                onclick={home}
                variant="default"
                type="submit"
                class="transition border-1 border-slate-600 duration-300 text-slate-600 bg-slate-200 hover:bg-slate-400"
                ><House />Home</Button
            >
        </div>

        <Tabs.Root value="scan">
            <Tabs.List
                class="absolute top-14 p-1 backdrop-blur-sm flex flex-row border-1 border-ring"
            >
                <Tabs.Trigger value="scan">Scan</Tabs.Trigger>
                <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="scan">
                <Card.Root
                    class="flex p-2 ml-20vw mr-20vw mt-26 bg-card border-ring"
                >
                    <Card.Header>
                        <Card.Title class="font-medium text-2xl"
                            >สแกนกิจกรรม</Card.Title
                        >
                    </Card.Header>
                    <Card.Content class="p-2">
                        <div
                            class="flex flex-col items-center justify-center gap-20px"
                        >
                            <reader
                                id="reader"
                                class="w-[500px] h-[500px] bg-slate-950 min-h-500px"
                            >
                            </reader>
                        </div>
                    </Card.Content>
                    <Card.Footer class="justify-between space-x-4">
                        {#if scanning}
                            <Button
                                onclick={stop}
                                class="transition border-1 border-rose-800 duration-300 text-rose-800 bg-rose-200 hover:bg-rose-500"
                                >Stop</Button
                            >
                        {:else}
                            <Button
                                onclick={start}
                                class="transition border-1 border-emerald-800 duration-300 text-emerald-800 bg-emerald-200 hover:bg-emerald-500"
                                >Start</Button
                            >
                        {/if}
                        <Select.Root type="single" bind:value>
                            <Select.Trigger class="w-[180px] border-ring">
                                <div
                                    class="truncate overflow-hidden whitespace-nowrap w-full"
                                >
                                    {triggerContent}
                                </div>
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>กิจกรรม</Select.Label>
                                    {#each data.bases as base}
                                        <Select.Item
                                            value={base.id.toString()}
                                            label={base.name}
                                            class="w-[180px] font-[sarabun]"
                                        >
                                            {base.name}
                                        </Select.Item>
                                    {/each}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </Card.Footer>
                </Card.Root>
            </Tabs.Content>
            <Tabs.Content value="manual">
                <Card.Root
                    class="flex p-2 ml-25vw mr-25vw mt-26 bg-card border-ring"
                >
                    <Card.Header>
                        <Card.Title class="font-medium text-2xl"
                            >กรอกกิจกรรม</Card.Title
                        >
                    </Card.Header>
                    <Card.Content class="p-8 pl-14 pr-14">
                        <div class="flex flex-col gap-6">
                            <div class="grid gap-2">
                                <Label for="text">ผู้ใช้ที่ต้องการยืนยัน</Label>
                                <Input
                                    id="text"
                                    type="text"
                                    placeholder="รหัสนักเรียน"
                                    class="w-[180px] border-ring"
                                    bind:value={user}
                                />
                            </div>
                            <Select.Root type="single" bind:value>
                                <Select.Trigger class="w-[180px] border-ring">
                                    <div
                                        class="truncate overflow-hidden whitespace-nowrap w-full"
                                    >
                                        {triggerContent}
                                    </div>
                                </Select.Trigger>
                                <Select.Content id="bases">
                                    <Select.Group>
                                        <Select.Label>กิจกรรม</Select.Label>
                                        {#each data.bases as base}
                                            <Select.Item
                                                value={base.id.toString()}
                                                label={base.name}
                                                class="w-[180px] font-[sarabun]"
                                            >
                                                {base.name}
                                            </Select.Item>
                                        {/each}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </div>
                    </Card.Content>
                    <Card.Footer class="p-2 justify-center flex flex-row">
                        <Button
                            onclick={manualApprove}
                            class="transition border-1 border-amber-800 duration-300 text-amber-800 bg-amber-200 hover:bg-amber-500"
                            >Approve</Button
                        >
                    </Card.Footer>
                </Card.Root>
            </Tabs.Content>
        </Tabs.Root>

        <AlertDialog open={showalert}>
            <AlertDialogContent class="w-75">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center"
                        >ยืนยันนักเรียน {scanres.id} ฐาน {triggerContent} 
                        หรือไม่
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div class="flex flex-row justify-around">
                        <Button
                            onclick={approve_and_reset}
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

        <AlertDialog open={showalert2}>
            <AlertDialogContent class="w-55">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center"
                        >{success}</AlertDialogTitle
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

<style>
    reader {
        width: 200px;
        height: 200px;
        min-height: 180px;
        background-color: rgb(0, 0, 0);
    }
</style>
