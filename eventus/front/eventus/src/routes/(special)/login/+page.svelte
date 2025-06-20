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

<body class="min-h-[60vh] m-0 p-0 bg-(--main) ">
    <div class="ml-10vw mr-10vw min-h-[10vh] min-w-[100vh]">
        <div class="flex justify-center text-center min-h-[10vh]">
            <div
                class="m-[1vw] mt-[10vh] p-[15px] backdrop-blur-[10px] bg-(--white-clear) rounded-[16px] 
                text-dark w-[300px] shadow-xl"
            >
                <img src={logo} width="60px" alt="bodindecha2" />
                <h2 class="text-center m-[10%]">เข้าสู่ระบบ</h2>
                <div class="flex-col justify-between flex items-center">
                    <input
                        bind:value={username}
                        placeholder="เลขประจำตัวนักเรียน"
                        class="p-[10px] backdrop-blur-[20px] border-2 border-solid 
                        bg-(--white-clear) outline-none rounded-[12px]"
                    />
                    <input
                        bind:value={password}
                        placeholder="รหัสผ่าน"
                        type="password"
                        class="p-[10px] backdrop-blur-[20px] border-2 border-solid 
                        bg-(--white-clear) outline-none rounded-[12px]"
                    />
                </div>
                <button on:click={login}>เข้าสู่ระบบ</button>
            </div>
        </div>
    </div>
</body>

<footer class="fixed text-center w-full">
    จัดทำโดยเด็ก AI
</footer>
