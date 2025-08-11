<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    export let value: string = "";

    const grade = [
        { value: "1", label: "ม.1" },
        { value: "2", label: "ม.2" },
        { value: "3", label: "ม.3" },
        { value: "4", label: "ม.4" },
        { value: "5", label: "ม.5" },
        { value: "6", label: "ม.6" },
    ];

    $: triggerContent =
        grade.find((f) => f.value === value)?.label ?? "เลือก";
</script>

<Select.Root type="single" name="grade" bind:value>
    <Select.Trigger class="w-24 border-ring">
        {triggerContent}
    </Select.Trigger>

    <Select.Content>
        <Select.Group>
            <Select.Label>ระดับชั้น</Select.Label>
            {#each grade as pre (pre.value)}
                <Select.Item value={pre.value} label={pre.label}>
                    {pre.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
