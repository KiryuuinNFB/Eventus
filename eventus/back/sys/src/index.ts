import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia, status, t } from "elysia";
import { PrismaClient } from "@prisma/client";

import { admin } from "./admin"
import { dev } from "./dev"

const prisma = new PrismaClient()

const app = new Elysia()
    .use(swagger())
    .use(logger())
    //admin commands for adding, removing and reading users
    .use(admin)
    .use(dev)
    .get("/", () => "amongus")
    .group('/auth', (app) =>
        app
            .post('/signin', async ({ jwt, body }) => {
                const { username, password} = body;
                const hashed = await Bun.password.hash(password)
                const signin = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                });
                const isMatch = Bun.password.verify(password, hashed)
                if (!isMatch) {
                    return status(401, "Unauthorized")
                }
                return jwt.sign(
                    {
                        username: signin?.username!,
                        exp: '15m'
                    },
                )
            }, {
                body: t.Object({
                    username: t.String(),
                    password: t.String()
                },
                    {
                        error: "Invalid credentials"
                    })
            })
    )

    .listen(3000);

console.log(
    `Elysia at http://${app.server?.hostname}:${app.server?.port}`
);