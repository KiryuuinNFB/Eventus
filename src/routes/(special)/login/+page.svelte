<script lang="ts">
    let sitetitle = "ลงชื่อเข้าใช้";
	import Heading from "../../head.svelte"
    
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
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

    import logo from "$lib/assets/logo.png";
    import { goto } from "$app/navigation";
    let username: string = "";
    let password: string = "";

    let alertstatus: string = "what";

    let showalert: boolean = false;

    const reset = () => {
        showalert = false;
    };

    const login = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (res.status === 401) {
            showalert = true;
            alertstatus = "รหัสผ่านไม่ถูกต้อง";
        } else if (res.status === 404) {
            showalert = true;
            alertstatus = `ไม่พบผู้ใช้ ${username}`;
        } else if (res.status === 200) {
            goto(`/user/${username}`);
        }
    };
</script>

<Heading SiteHead={sitetitle}/>

<div class="min-h-screen bg-border font-[sarabun]">
    <div class="flex text-center justify-center">
        <Card.Root class="flex p-6 m-16 bg-card border-ring">
            <Card.Header class="flex flex-col items-center">
                <img src={logo} width="60" alt="bodindecha 2" />
                <Card.Title class="font-medium text-2xl">เข้าสู่ระบบ</Card.Title
                >
            </Card.Header>
            <Card.Content>
                <form>
                    <div class="flex flex-col gap-6">
                        <div class="grid gap-2">
                            <Label for="text">ชื่อผู้ใช้</Label>
                            <Input
                                id="text"
                                type="text"
                                placeholder="รหัสนักเรียน"
                                class="max-w-xs border-ring"
                                bind:value={username}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="password">รหัสผ่าน</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="ห้อง+เลขที่"
                                class="max-w-xs border-ring"
                                bind:value={password}
                            />
                        </div>
                    </div>
                </form>
            </Card.Content>
            <Card.Footer>
                <Button
                    onclick={login}
                    variant="default"
                    type="submit"
                    class="w-full transition border-1 border-emerald-800 duration-300 text-emerald-800 bg-emerald-200 hover:bg-emerald-500"
                    >เข้าสู่ระบบ</Button
                >
            </Card.Footer>
        </Card.Root>
        <AlertDialog open={showalert}>
            <AlertDialogContent class="w-55">
                <AlertDialogHeader>
                    <AlertDialogTitle class="text-center"
                        >{alertstatus}</AlertDialogTitle
                    >
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        onclick={reset}
                        variant="default"
                        type="submit"
                        class="w-full transition border-1 border-emerald-800 duration-300 text-emerald-800 bg-emerald-200 hover:bg-emerald-500"
                        >Ok</Button
                    >
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <a
            href="https://github.com/KiryuuinNFB"
            class="transition duration-300 fixed hover:text-emerald-500 text-center w-full left-0 bottom-0 p-1"
            >จัดทำโดยเฟมบอยนิรนามเพื่อเพื่อนๆทุกคน ♡</a
        >
    </div>
</div>
