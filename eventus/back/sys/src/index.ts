import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia, status, t, file } from "elysia";
import { PrismaClient } from "@prisma/client";
import { cors } from '@elysiajs/cors'

import { admin } from "./admin"
import { dev } from "./dev"

interface JwtPayload {
    username: string

}

const prisma = new PrismaClient()

const app = new Elysia()
    .use(swagger())
    .use(logger())
    .use(
        cors({
            origin: '*',
            methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'authorization']
        })
    )
    //admin commands for adding, removing and reading users
    .use(admin)
    .use(dev)
    .onError(({ error }) => {
        return new Response(error.toString())
    })
    .get("/", () => file("elysialmao.jpeg"))
    .group('/auth', (app) =>
        app
            .post('/login', async ({ jwt, body }) => {
                const { username, password } = body;
                const login = await prisma.user.findUnique({
                    where: { username }
                });
                if (!login) {
                    return status(404, "Not found")
                }
                const hashed = login?.password!
                const isMatch = await Bun.password.verify(password, hashed)
                if (!isMatch) {
                    return status(401, "Unauthorized")
                }
                const jwttoken = await jwt.sign(
                    {
                        username: login?.username!,
                        exp: '15m'
                    },
                )

                return { "token": jwttoken }
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
    .group('/api', (app) =>
        app
            .get('/:username', async ({ jwt, params: { username }, headers: { authorization } }) => {

                const decoded = await jwt.verify(authorization) as unknown as JwtPayload
                const decodeduser = await prisma.user.findUnique({
                    where: {
                        username: decoded?.username!
                    }
                });
                if (!decoded || decodeduser?.username !== username)
                    return status(401, "Unauthorized")
                const getuser = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                })
                const getevents = await prisma.completion.findMany({
                    where: {
                        userId: username
                    }
                })
                return {
                    "studentId": getuser?.username,
                    "ulid": getuser?.id,
                    "name": getuser?.name,
                    "surname": getuser?.surname,
                    "events": getevents,
                    "role": getuser?.role
                }
            })
    )

    .listen(3000);

console.log(
    `Elysia at http://${app.server?.hostname}:${app.server?.port}`
);