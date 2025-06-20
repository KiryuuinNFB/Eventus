import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const dev = new Elysia({ prefix: '/dev' })
    .group('', (app) =>
        app
            .put('/base', async ({ body }) => {
                const { name, desc, location } = body;
                const base = await prisma.base.create({
                    data: {
                        name,
                        desc,
                        location
                    }
                });

                return {
                    id: base.id,
                    name: base.name
                };
            }, {
                body: t.Object({
                    name: t.String(),
                    desc: t.String(),
                    location: t.String()
                })
            })
            .delete('/base', async ({ body }) => {
                const { id } = body;
                const base = await prisma.base.delete({
                    where: {
                        id: id
                    }
                });

                return {
                    id: base.id,
                    name: base.name
                };
            }, {
                body: t.Object({
                    id: t.Number()
                })
            })
    )
    .group('', (app) =>
        app
            .put('/user', async ({ body }) => {
                const { username, password, name, surname, role } = body;
                const hashed = await Bun.password.hash(password, { algorithm: "argon2id", memoryCost: 4, timeCost: 3 })

                const user = await prisma.user.create({
                    data: {
                        username,
                        password: hashed,
                        name,
                        surname,
                        role: role ?? 'USER'
                    },
                });

                return {
                    username: user.username,
                    role: user.role
                };
            },{
                body: t.Object({
                    username: t.String(),
                    password: t.String(),
                    name: t.String(),
                    surname: t.String(),
                    role: t.Optional(t.Enum({
                        USER: 'USER',
                        ADMIN: 'ADMIN'
                    })),
                })
            })
            .delete('/user', async ({ body }) => {
                const { username } = body;
                const deluser = await prisma.user.delete({
                    where: {
                        username: username,
                    }
                });
                return {
                        id: deluser.username
                    }
            }, {
                body: t.Object({
                    username: t.String()
                })
            })
    )
