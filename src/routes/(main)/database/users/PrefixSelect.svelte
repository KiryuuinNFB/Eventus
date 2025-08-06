<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    export let value: string = "";

    const prefix = [
        { value: "DekChai", label: "ด.ช." },
        { value: "DekYing", label: "ด.ญ." },
        { value: "Nai", label: "นาย" },
        { value: "Nang", label: "นาง" },
        { value: "NangSao", label: "นางสาว" },
    ];

    $: triggerContent =
        prefix.find((f) => f.value === value)?.label ?? "คำนำหน้า";
</script>

<Select.Root type="single" name="prefix" bind:value>
    <Select.Trigger class="w-24 border-ring">
        {triggerContent}
    </Select.Trigger>

    <Select.Content>
        <Select.Group>
            <Select.Label>คำนำหน้า</Select.Label>
            {#each prefix as pre (pre.value)}
                <Select.Item value={pre.value} label={pre.label}>
                    {pre.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
