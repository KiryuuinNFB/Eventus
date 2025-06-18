<script>
    let username = "";
    let password = "";

    const login = async () => {
        const res = await fetch("http://192.168.1.34:3000/auth/login", {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json()
        console.log(data)

        alert(data.token)
    };
</script>

<div class="content">
    <div class="centerdiv">
        <div class="loginbox">
            <h2 class="logintopic">เข้าสู่ระบบ</h2>
            <div class="loginformlists">
                <input
                    bind:value={username}
                    placeholder="เลขประจำตัวนักเรียน"
                    class="loginform"
                />
                <input
                    bind:value={password}
                    placeholder="รหัสผ่าน"
                    type="password"
                    class="loginform"
                />
                <button on:click={login} class="loginsubmit">เข้าสู่ระบบ</button
                >
            </div>
        </div>
    </div>
</div>
