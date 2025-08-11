<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";

    const items = [
        {
            title: "หน้าหลัก",
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

<Sidebar.Root variant="floating" class="font-[sarabun]">
    <Sidebar.Header>
        <h1 class="text-2xl">
            หลังบ้าน ALiCE
        </h1>
        <p class="text-muted-foreground text-xs">
            Authenticated Log in Checker for Eventus
        </p>
    </Sidebar.Header>
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel>
                    เมนู
                
               
            </Sidebar.GroupLabel>
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
        <a href="/">ออกจากหลังบ้าน</a>
    </Sidebar.Footer>
</Sidebar.Root>
