<script>
    import logo from "$lib/assets/logo.png";
    import { goto } from "$app/navigation";
    let username = "";
    let password = "";

    const login = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (res.status === 401) {
            alert("Invalid Credentials");
        } else if (res.status === 404) {
            alert(`User ${username} not found`);
        } else if (res.status === 200) {
            goto(`/user/${username}`);
        }
    };
</script>

<div>
    <div class="centerdiv">
        <div class="loginbox">
            <img src={logo} width="80px" alt="bodindecha2" />
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
    <div class="watermark">จัดทำโดยเฟมบอยนิรนามเพื่อเพื่อนๆทุกคน ♡</div>
</div>
