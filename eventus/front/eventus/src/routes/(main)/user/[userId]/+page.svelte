<script lang="ts">
    type Events = {
        id: number;
        completedOn: string;
        baseId: number;
        userId: string;
    };

    type Bases = {
        id: number;
        name: string;
        desc: string;
        location: string;
    };

    type User = {
        studentId: string;
        ulid: string;
        name: string;
        surname: string;
        role: string;
        events: Events[];
    };

    export let data: {
        user: User;
        bases: Bases[];
    };

    const user = data.user;
    const bases = data.bases
</script>

<div class="centerdiv">
    <div class="content">
        <div class="contentbox">
            <h1 class="bigtopic">สวัสดีคุณ {user.name} {user.surname}</h1>
            <p>ID : {user.studentId}</p>
            <p>ULID : {user.ulid}</p>
            <p>Role : {user.role}</p>
        </div>
        {#each user.events as event}
            <div class="contentbox">
                <p>{user.name}</p>
                <p>{event.baseId}</p>
                <p>{event.completedOn}</p>
            </div>
        {/each}
    </div>
</div>
