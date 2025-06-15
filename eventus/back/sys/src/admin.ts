import { Elysia, status, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { jwt } from '@elysiajs/jwt'

interface JwtPayload {
    username: string

}

const prisma = new PrismaClient()

export const admin = new Elysia()
    .use(
        jwt({
            name: 'jwt',
            secret: 'RIKUHACHIMA'
        })
    )
    .group('/user', (app) =>
        app
            .post('/add', async ({ jwt, body, headers: { authorization } }) => {
                const { username, password, role } = body;
                const hashed = await Bun.password.hash(password)

                const decoded = await jwt.verify(authorization) as unknown as JwtPayload
                const decodeduser = await prisma.user.findUnique({
                    where: {
                        username: decoded?.username!
                    }
                });
                if (!decoded || decodeduser?.role !== 'ADMIN')
                    return status(401, "Unauthorized")
                const user = await prisma.user.create({
                    data: {
                        username,
                        password: hashed,
                        role: role ?? 'USER'
                    },
                });

                return {
                    username: user.username,
                    role: user.role
                };
            }, {
                body: t.Object({
                    username: t.String(),
                    password: t.String(),
                    role: t.Optional(t.Enum({
                        USER: 'USER',
                        ADMIN: 'ADMIN'
                    })),
                }),
            })
            .post('/remove', async ({ jwt, body, headers: { authorization } }) => {
                const { username, password } = body;
                const hashed = await Bun.password.hash(password)

                const decoded = await jwt.verify(authorization) as unknown as JwtPayload
                const decodeduser = await prisma.user.findUnique({
                    where: {
                        username: decoded?.username!
                    }
                });
                if (!decoded || decodeduser?.role !== 'ADMIN')
                    return status(401, "Unauthorized")
                const deluser = await prisma.user.delete({
                    where: {
                        username: username,
                        password: hashed
                    }
                });

                return {
                    id: deluser.username,
                };

            }, {
                body: t.Object({
                    username: t.String(),
                    password: t.String()
                })
            })
            .get('/:username', async ({ jwt, params: { username }, headers: { authorization } }) => {
                const getuser = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                });

                const decoded = await jwt.verify(authorization) as unknown as JwtPayload
                const decodeduser = await prisma.user.findUnique({
                    where: {
                        username: decoded?.username!
                    }
                });
                if (!decoded || decodeduser?.role !== 'ADMIN')
                    return status(401, "Unauthorized")
                return {
                    username: getuser?.username,
                    role: getuser?.role
                };

            }, {
                body: t.Object({
                    username: t.String()
                })
            })
    )
    .post('/approve/:user/:base', async ({ jwt, params: { user, base }, headers: { authorization } }) => {
        const decoded = await jwt.verify(authorization) as unknown as JwtPayload
        const decodeduser = await prisma.user.findUnique({
            where: {
                username: decoded?.username!
            }
        });
        if (!decoded || decodeduser?.role !== 'ADMIN')
            return status(401, "Unauthorized")
        await prisma.completion.create({
            data: {
                baseId: base,
                userId: user,
            }
        })
    }, {
        params: t.Object({
            user: t.String(),
            base: t.Numeric()
        })
    })


/* 
admin commands used in production. require admin token
*/