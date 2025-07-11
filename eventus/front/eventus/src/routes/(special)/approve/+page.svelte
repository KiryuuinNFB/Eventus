<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
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

    let value = $state("");

    const baseArr: Base[] = data["bases"];
    const triggerContent = $derived(
        baseArr.find((f: any) => f.id.toString() === value)?.name ?? "เลือกฐาน",
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
        const res = await fetch('api/approve', {
            method: "POST",
            headers: {},
            body: JSON.stringify({ "user": user, "base": value}),
        })
        const data = await res.json()
        return data
    }

    onMount(init);

    const reset = () => {
        showalert = false;
    };

    const reset2 = () => {
        showalert2 = false;
    };

    let success: string = $state("")

    const approve_and_reset = async () => {
        showalert = false;
        const res = await approve()
        if(res.status !== 200) {
            success = "เคยยืนยันไปแล้ว"
            showalert2 = true;
            return
        }
        success = "ยืนยันนักเรียนเรียบร้อยแล้ว"
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
                    width: 180,
                    height: 180,
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
    }

    function onScanFailure(error: any) {
        console.log("no qr found");
    }
</script>

<div class="h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <Card.Root class="flex p-2 ml-25vw mr-25vw mt-16 bg-card border-ring">
            <Card.Header>
                <Card.Title class="font-medium text-2xl">Approve ฐาน</Card.Title
                >
                <Card.Description>กรุณาปรับหน้าจอให้สว่าง</Card.Description>
            </Card.Header>
            <Card.Content class="p-12">
                <div class="flex flex-col items-center justify-center gap-20px">
                    <reader
                        id="reader"
                        class="w-80vw h-80vw bg-slate-950 min-h-500px"
                    >
                    </reader>
                </div>
            </Card.Content>
            <Card.Footer class="p-2 justify-between">
                {#if scanning}
                    <Button
                        onclick={stop}
                        class="transition duration-300 bg-rose-700 hover:bg-rose-500 border-ring"
                        >Stop</Button
                    >
                {:else}
                    <Button
                        onclick={start}
                        class="transition duration-300 bg-teal-700 hover:bg-teal-500 border-ring"
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
                            <Select.Label>ฐาน</Select.Label>
                            {#each data.bases as base}
                                <Select.Item
                                    value={base.id.toString()}
                                    label={base.name}
                                    class="w-[180px]"
                                >
                                    {base.name}
                                </Select.Item>
                            {/each}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Card.Footer>
        </Card.Root>

        <AlertDialog open={showalert}>
            <AlertDialogContent class="w-75">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center"
                        >ยืนยันนักเรียน {scanres.id} ฐาน {triggerContent} ( ID: {value}) หรือไม่
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div class="flex flex-row justify-around">
                        <Button
                            onclick={approve_and_reset}
                            variant="default"
                            type="submit"
                            class="w-[60] transition duration-300 bg-teal-700 hover:bg-teal-500"
                            >Ok</Button
                        >
                        <Button
                            onclick={reset}
                            variant="default"
                            type="submit"
                            class="w-[60] transition duration-300 bg-rose-700 hover:bg-rose-500"
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
                        class="w-[60] transition duration-300 bg-teal-700 hover:bg-teal-500"
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
