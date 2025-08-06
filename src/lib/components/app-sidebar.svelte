<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { Header } from "./ui/alert-dialog";

    const items = [
        {
            title: "บ้าน",
            url: "/database",
        },
        {
            title: "ผู้ใช้",
            url: "/database/users",
        },
        {
            title: "กิจกรรม",
            url: "/database/bases",
        },
    ];
</script>

<Sidebar.Root variant="inset">
    <Sidebar.Header>หลังบ้าน ALiCE</Sidebar.Header>
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel>เมนู</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each items as item (item.title)}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                    <a href={item.url} {...props}>
                                        <span>{item.title}</span>
                                    </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
        <a href="/">กลับหน้าหลัก</a>
    </Sidebar.Footer>
</Sidebar.Root>
