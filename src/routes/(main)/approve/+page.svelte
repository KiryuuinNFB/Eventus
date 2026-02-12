<script lang="ts">
    let sitetitle = "ยืนยันฐาน";
    import Heading from "../../head.svelte";

    import { onMount } from "svelte";
    import * as faceapi from "face-api.js";

    import { toast } from "svelte-sonner";

    async function loadModels() {
        const url = "/models";

        await faceapi.nets.ssdMobilenetv1.loadFromUri(url);
        await faceapi.nets.faceLandmark68Net.loadFromUri(url);
        await faceapi.nets.faceRecognitionNet.loadFromUri(url);

        console.log("Models loaded");
    }

    let video: HTMLVideoElement | null = null;

    let overlay: HTMLCanvasElement | null = null;

    let faceStream: MediaStream | null = null;
    let faceTimer: any = null;

    let labeledDescriptors: faceapi.LabeledFaceDescriptors[] = [];

    let detectedUser = $state<string | null>(null);

    let matcher: faceapi.FaceMatcher;

    async function loadKnownFaces() {
        const students = ["22621", "22588"]; // add more IDs here

        const result: faceapi.LabeledFaceDescriptors[] = [];

        for (const id of students) {
            const descriptors: Float32Array[] = [];

            // how many photos per student
            for (let i = 1; i <= 2; i++) {
                try {
                    const img = await faceapi.fetchImage(
                        `/faces/${id}/${i}.jpg`,
                    );

                    const detection = await faceapi
                        .detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor();

                    if (detection) {
                        descriptors.push(detection.descriptor);
                    }
                } catch (err) {
                    console.log(`Missing image: ${id}/${i}.jpg`);
                }
            }

            if (descriptors.length > 0) {
                result.push(
                    new faceapi.LabeledFaceDescriptors(id, descriptors),
                );
            }
        }

        labeledDescriptors = result;

        console.log("Faces loaded:", result);
        matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);
    }

    async function startCamera() {
        faceStream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });
        if (!video) return;

        video.srcObject = faceStream;
        await video.play();

        if (overlay && video) {
            const rect = video.getBoundingClientRect();

            overlay.width = rect.width;
            overlay.height = rect.height;
        }
    }

    function stopScan() {
        aiscanning = false;

        if (faceTimer) clearTimeout(faceTimer);

        if (faceStream) {
            faceStream.getTracks().forEach((t) => t.stop());
            faceStream = null;
        }
        if (!video) return;
        video.srcObject = null;
    }

    function scanLoop() {
        if (!aiscanning) return;

        faceTimer = setTimeout(async () => {
            if (!video) return;
            const result = await faceapi
                .detectSingleFace(video)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (overlay && video) {
                const ctx = overlay.getContext("2d");
                if (!ctx) return;

                ctx.clearRect(0, 0, overlay.width, overlay.height);

                if (result) {
                    const dims = faceapi.matchDimensions(overlay, video, true);
                    const resized = faceapi.resizeResults(result, dims);

                    faceapi.draw.drawDetections(overlay, resized);
                    faceapi.draw.drawFaceLandmarks(overlay, resized);
                }
            }
            if (result) {
                const match = matcher.findBestMatch(result.descriptor);

                if (match.label !== "unknown") {
                    detectedUser = match.label;
                    console.log("Detected:", match.label);
                }
            }

            scanLoop();
        }, 800);
    }

    async function startScan() {
        await startCamera();

        aiscanning = true;

        scanLoop();
    }

    onMount(async () => {
        await loadModels();
        await loadKnownFaces();
    });

    let lastApproved = "";

    $effect(() => {
        if (detectedUser && detectedUser !== lastApproved) {
            lastApproved = detectedUser;
            user = detectedUser;
            insta_approve();
        }
    });

    $effect(() => {
        if (!detectedUser) {
            lastApproved = "";
        }
    });

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
    let aiscanning: boolean = $state(false);

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

    const insta_approve_qr = async () => {
        if (!check_qr_age(time)) {
            toast("QR Code หมดอายุ");
            return;
        }
        const res = await approve();
        if (res.status !== 200) {
            if (res.status === 404) {
                toast("ไม่พบผู้ใช้");
                return;
            }
            toast("เคยยืนยันไปแล้ว");

            return;
        }
        toast("ยืนยันนักเรียนเรียบร้อยแล้ว");
    };

    const insta_approve = async () => {
        const res = await approve();
        if (res.status !== 200) {
            if (res.status === 404) {
                toast("ไม่พบผู้ใช้");
                return;
            }
            toast("เคยยืนยันไปแล้ว");

            return;
        }
        toast("ยืนยันนักเรียนเรียบร้อยแล้ว");
    };

    function init() {
        html5Qrcode = new Html5Qrcode("reader");
    }

    function start() {
        html5Qrcode.start(
            { facingMode: "environment" },
            {
                fps: 6,
                qrbox: {
                    width: 250,
                    height: 250,
                },
                aspectRatio: 1,
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
        //showalert = true;
        insta_approve_qr();
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

<Heading SiteHead={sitetitle} />

<div class="min-h-screen bg-border font-[sarabun]">
    <div>
        <div class="flex flex-row justify-around">
            <div class="text-center absolute top-0 p-2 flex flex-row">
                <Button
                    onclick={home}
                    variant="default"
                    type="submit"
                    class="transition border-1 border-slate-600 duration-300 text-slate-600 bg-slate-200 hover:bg-slate-400"
                    ><House />Home</Button
                >
            </div>
        </div>

        <Tabs.Root value="scan">
            <div class="flex justify-center">
                <Tabs.List
                    class="absolute top-14 p-1 backdrop-blur-sm flex flex-row border-1 border-ring"
                >
                    <Tabs.Trigger value="scan">Scan</Tabs.Trigger>
                    <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
                    <Tabs.Trigger value="ai">Face Recognize</Tabs.Trigger>
                </Tabs.List>
            </div>

            <Tabs.Content value="scan">
                <div>
                    <h1 class="text-2xl flex justify-around mt-25">
                        สแกนกิจกรรม
                    </h1>
                </div>
                <div class="flex flex-row justify-around mt-4">
                    <reader id="reader" class="bg-slate-950"> </reader>
                </div>
                <div class="p-2 flex flex-row justify-around">
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
            </Tabs.Content>
            <Tabs.Content value="manual" class="text-center">
                <div class="flex justify-around">
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
                                    <Label for="text"
                                        >ผู้ใช้ที่ต้องการยืนยัน</Label
                                    >
                                    <Input
                                        id="text"
                                        type="text"
                                        placeholder="รหัสนักเรียน"
                                        class="w-[180px] border-ring"
                                        bind:value={user}
                                    />
                                </div>
                                <Select.Root type="single" bind:value>
                                    <Select.Trigger
                                        class="w-[180px] border-ring"
                                    >
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
                                onclick={insta_approve}
                                class="transition border-1 border-amber-800 duration-300 text-amber-800 bg-amber-200 hover:bg-amber-500"
                                >Approve</Button
                            >
                        </Card.Footer>
                    </Card.Root>
                </div>
            </Tabs.Content>

            <Tabs.Content value="ai">
                <div>
                    <h1 class="text-2xl flex justify-around mt-25">
                        ตรวจจากใบหน้า
                    </h1>
                </div>
                <div class="relative w-[90vw] max-w-md mx-auto aspect-video">
                    <video
                        bind:this={video}
                        autoplay
                        playsinline
                        muted
                        class="w-full h-full object-cover rounded-lg bg-slate-950"
                    ></video>

                    <canvas
                        bind:this={overlay}
                        class="absolute inset-0 pointer-events-none"
                    ></canvas>
                </div>
                <div class="p-2 flex flex-row justify-around">
                    {#if aiscanning}
                        <Button
                            onclick={stopScan}
                            class="transition border-1 border-rose-800 duration-300 text-rose-800 bg-rose-200 hover:bg-rose-500"
                            >Stop</Button
                        >
                    {:else}
                        <Button
                            onclick={startScan}
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
                {#if detectedUser}
                        <p class="mt-4 text-green-600">
                            Detected: {detectedUser}
                        </p>
                    {/if}
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
        width: 90vw;
        height: 90vw;
        border-radius: 12px;
    }

    video {
        width: 90vw;
        height: 90vw;
        border-radius: 12px;
    }

    canvas {
        width: 90vw;
        height: 90vw;
    }
</style>
