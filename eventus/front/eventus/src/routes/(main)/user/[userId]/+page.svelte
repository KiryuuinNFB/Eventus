<script lang="ts">
    type User = {
        studentId: string;
        ulid: string;
        name: string;
        surname: string;
        role: string;
    };

    export let data: {
        user: User;
    };
    const user = data.user;
</script>

<div class="content">
    <h1 class="bigtopic">สวัสดีคุณ {user.name} {user.surname}</h1>
    <p>ID : {user.studentId}</p>
    <p>ULID : {user.ulid}</p>
    <p>Role : {user.role}</p>
</div>
