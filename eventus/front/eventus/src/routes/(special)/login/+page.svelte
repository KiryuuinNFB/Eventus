<script>
    import logo from '$lib/assets/logo.png';
    let username = "";
    let password = "";

    const login = async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
        });
        if (res.status === 401) {
            alert("Invalid Credentials")
        } else if (res.status === 200) {
            const data = await res.json()
            alert(`Login Success with token ${data.token}`)
        } else if (res.status === 404) {
            alert(`User ${username} not found`)
        }  
    };
</script>

<div class="loginbg">
    <div class="centerdiv">
        <div class="loginbox">
            <img src="{logo}" width="60px" alt="bodindecha2">
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
    <div class="watermark">
        จัดทำโดยเด็ก AI
    </div>
</div>
