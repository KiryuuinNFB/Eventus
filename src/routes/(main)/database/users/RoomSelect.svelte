<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    export let value: string = "";

    const room = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
    ];

    $: triggerContent = room.find((f) => f.value === value)?.label ?? "เลือก";
</script>

<Select.Root type="single" name="room" bind:value>
    <Select.Trigger class="w-24 border-ring">
        {triggerContent}
    </Select.Trigger>

    <Select.Content>
        <Select.Group>
            <Select.Label>ห้อง</Select.Label>
            {#each room as pre (pre.value)}
                <Select.Item value={pre.value} label={pre.label}>
                    {pre.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
