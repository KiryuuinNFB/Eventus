<script>
    import logo from "$lib/assets/logo.png";
    let username = "";
    let password = "";

    const login = async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (res.status === 401) {
            alert("Invalid Credentials");
        } else if (res.status === 200) {
            const data = await res.json();
            alert(`Login Success with token ${data.token}`);
        } else if (res.status === 404) {
            alert(`User ${username} not found`);
        }
    };
</script>

<body class="min-h-[60vh] m-0 p-0 overflow-auto bg-(--main) ">
    <div class="ml-10vw mr-10vw min-h-[10vh] min-w-[100vh]">
        <div class="flex justify-center text-center min-h-[10vh]">
            <div
                class="backdrop-blur-[10px] bg-light/15 border-r-[16px] 
                text-dark w-[300px] mt-[10vh]"
            >
                <img src={logo} width="60px" alt="bodindecha2" />
                <h2>เข้าสู่ระบบ</h2>
                <div class="flex-column justify-between flex items-center shadow-loginbox">
                    <input
                        bind:value={username}
                        placeholder="เลขประจำตัวนักเรียน"
                        class="backdrop-blur-[20px] bg-(--white-clear) outline-none "
                    />
                    <input
                        bind:value={password}
                        placeholder="รหัสผ่าน"
                        type="password"
                    />
                    <button on:click={login}>เข้าสู่ระบบ</button>
                </div>
            </div>
        </div>
    </div>
</body>

<footer class="fixed text-center w-full">
    จัดทำโดยเด็ก AI
</footer>
