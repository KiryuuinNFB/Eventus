<script lang="ts">
    import { goto } from "$app/navigation";
    import DataTable from "../data-table.svelte";
    import { columns } from "./columns.js";

    import PrefixSelect from "./PrefixSelect.svelte";
    import GradeSelect from "./GradeSelect.svelte";
    import RoleSelect from "./RoleSelect.svelte";
    import RoomSelect from "./RoomSelect.svelte";

    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import { Plus, PencilLine } from "@lucide/svelte";
    

    export let data;

    $: currentPage = data.page;

    

    function changePage(newPage: number) {
        const params = new URLSearchParams({
            page: newPage.toString(),
        });

        goto(`?${params.toString()}`);
    }

    const create = async () => {
        const res = await fetch("/api/user/create", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: data.token,
            },
            body: JSON.stringify({
                username: createUsername,
                password: createPassword,
                name: createName,
                surname: createSurname,
                role: createRole,
                prefix: createPrefix,
                grade: parseInt(createGrade),
                room: parseInt(createRoom)
            }),
        });

        if (res.ok) {
            changePage(currentPage);
        }
    };

    const edit = async () => {
        const res = await fetch("/api/user/edit", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: data.token,
            },
            body: JSON.stringify({
                username: createUsername,
                password: createPassword,
                name: createName,
                surname: createSurname,
                role: createRole,
                prefix: createPrefix,
                grade: parseInt(createGrade),
                room: parseInt(createRoom)
            }),
        });

        if (res.ok) {
            changePage(currentPage);
        }
    };

    let createUsername: string;
    let createPassword: string;
    let createName: string;
    let createSurname: string;
    let createRole: string;
    let createPrefix: string;
    let createGrade: string;
    let createRoom: string;
</script>

<div class="text-4xl">ข้อมูลผู้ใช้</div>

<div class="flex flex-row justify-center gap-4 m-4">
    <DataTable data={data.data} {columns} />
    <Card.Root>
        <Card.Header>
            <Card.Title>เพิ่มข้อมูล</Card.Title>
        </Card.Header>
        <Card.Content>
            

            <form>
                <div class="flex flex-row gap-6">
                    <div class="flex flex-col gap-6">
                        <div class="grid gap-2">
                            <Label for="text">รหัสนักเรียน</Label>
                            <Input
                                id="text"
                                type="text"
                                class="max-w-48 border-ring"
                                bind:value={createUsername}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="password">รหัสผ่าน</Label>
                            <Input
                                id="password"
                                type="password"
                                class="max-w-48 border-ring"
                                bind:value={createPassword}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="name">ชื่อ</Label>
                            <Input
                                id="name"
                                type="text"
                                class="max-w-48 border-ring"
                                bind:value={createName}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="surname">นามสกุล</Label>
                            <Input
                                id="surname"
                                type="text"
                                class="max-w-48 border-ring"
                                bind:value={createSurname}
                            />
                        </div>
                    </div>
                    <div class="flex flex-col gap-6">
                        <div class="grid gap-2">
                            <Label for="prefix">คำนำหน้าชื่อ</Label>
                            <PrefixSelect bind:value={createPrefix}/>
                        </div>
                        <div class="grid gap-2">
                            <Label for="role">ตำแหน่ง</Label>
                            <RoleSelect bind:value={createRole}/>
                        </div>

                        <div class="grid gap-2">
                            <Label for="grade">ระดับชั้น</Label>
                            <GradeSelect bind:value={createGrade}/>
                        </div>
                        <div class="grid gap-2">
                            <Label for="room">ห้อง</Label>
                            <RoomSelect bind:value={createRoom}/>
                        </div>
                    </div>
                </div>
            </form>
        </Card.Content>
        <Card.Footer>
            <div class="flex flex-row justify-around gap-2">
                <Button
                    onclick={create}
                    class="transition border-1 border-emerald-800 duration-300 text-emerald-800 bg-emerald-200 hover:bg-emerald-500"
                    ><Plus />เพิ่ม</Button
                >
                <Button
                    onclick={edit}
                    class="transition border-1 border-amber-800 duration-300 text-amber-800 bg-amber-200 hover:bg-amber-500"
                    ><PencilLine />แก้ไข</Button
                >
            </div>
        </Card.Footer>
    </Card.Root>
</div>


<div class="flex flex-row justify-center fixed bottom-8">
    <Pagination.Root count={data.total} perPage={10} class="">
        {#snippet children({ pages, currentPage })}
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.PrevButton
                        onclick={() => changePage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    />
                </Pagination.Item>
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                        <Pagination.Item>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    {:else}
                        <Pagination.Item>
                            <Pagination.Link
                                {page}
                                isActive={currentPage === page.value}
                                onclick={() => changePage(page.value)}
                            >
                                {page.value}
                            </Pagination.Link>
                        </Pagination.Item>
                    {/if}
                {/each}
                <Pagination.Item>
                    <Pagination.NextButton
                        onclick={() => changePage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(data.total / 10)}
                    />
                </Pagination.Item>
            </Pagination.Content>
        {/snippet}
    </Pagination.Root>
</div>
