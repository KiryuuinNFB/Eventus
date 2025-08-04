<script lang="ts">
    let sitetitle = "เกี่ยวกับ";
    import Heading from "../../head.svelte";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { House } from "@lucide/svelte";

    import { goto } from "$app/navigation";

    export let data;

    const home = () => {
        goto(`/user/${data.user}`);
    };
</script>

<Heading SiteHead={sitetitle} />

<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <div
            class="absolute top-0 p-2 flex flex-row"
        >
            <Button
                onclick={home}
                variant="default"
                type="submit"
                class="transition border-1 border-slate-600 duration-300 text-slate-600 bg-slate-200 hover:bg-slate-400"
                ><House />Home</Button
            >
        </div>
        <div class="flex flex-col max-w-[400px] justify-self-center">
            <Card.Root
                class="flex p-2 ml-25vw mr-25vw mt-16 max-w-[350px] bg-card border-ring"
            >
                <Card.Header>
                    <Card.Title class="font-medium text-2xl"
                        >เกี่ยวกับ</Card.Title
                    >
                </Card.Header>
                <Card.Content class="p-4">
                    <h1 class="text-xl p-2">ผู้พัฒนา</h1>
                    <div class="flex flex-row justify-center space-x-2">
                        <Avatar.Root>
                            <Avatar.Image
                                src="https://avatars.githubusercontent.com/u/57798153?v=4&size=64"
                                alt="KiryuuinNFB"
                            />
                            <Avatar.Fallback>KiryuuinNFB</Avatar.Fallback>
                        </Avatar.Root>
                        <a
                        href="https://github.com/KiryuuinNFB"
                        class="transition duration-300 hover:text-emerald-500"
                        >KiryuuinNFB</a
                    >
                    </div>
                    
                    <p class="text-muted-foreground">
                        (หากไม่ชอบระบบแล้วรู้ว่าผมเป็นใครมาหาที่ห้องแล้วมาบ่นได้นะ คำใบ้คือตามตัวได้ง่ายมากถ้าหาดีๆ)
                    </p>

                    <h1 class="text-xl p-2">ที่มาชื่อ</h1>

                    <p class="text-left">
                        หน้าบ้านชื่อ Eventus (อีเวนตัส) มาจาก
                    </p>
                    <code class="bg-slate-200 rounded-sm">Event + us</code>
                    <p class="text-left">หลังบ้านชื่อ ALiCE (อลิซ) ย่อมาจาก</p>
                    <code class="bg-slate-200 rounded-sm"
                        >Authenticated Log in Checker for Eventus</code
                    >
                    <p class="text-muted-foreground">
                        (มาจากความเบียวคนสร้างล้วนๆ)
                    </p>

                    <h1 class="text-xl p-2">เพิ่มเติม</h1>
                    <a
                        href="https://docs.google.com/presentation/d/1sRKlPrm0oUT6IG3y1jyjC-jm-CnOR-eBqO1opLwUEck/edit?usp=sharing"
                        class="transition duration-300 hover:text-emerald-500"
                        >ข้อมูลเพิ่มเติมเกี่ยวกับระบบ</a
                    >
                </Card.Content>
                <Card.Footer class="p-2 justify-between">
                    <a
                        href="https://github.com/KiryuuinNFB/Eventus"
                        class="transition duration-300 hover:text-emerald-500"
                        >Github</a
                    >
                </Card.Footer>
            </Card.Root>
        </div>
    </div>
</div>
