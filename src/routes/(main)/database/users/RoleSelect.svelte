<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    export let value: string = "";

    const role = [
        { value: "ADMIN", label: "ผู้ดูแลระบบ" },
        { value: "MOD", label: "พี่ฐาน" },
        { value: "USER", label: "ผู้ใช้" }
    ];

    $: triggerContent =
        role.find((f) => f.value === value)?.label ?? "ตำแหน่ง";
</script>

<Select.Root type="single" name="role" bind:value>
    <Select.Trigger class="w-24 border-ring">
        {triggerContent}
    </Select.Trigger>

    <Select.Content>
        <Select.Group>
            <Select.Label>ตำแหน่ง</Select.Label>
            {#each role as pre (pre.value)}
                <Select.Item value={pre.value} label={pre.label}>
                    {pre.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
