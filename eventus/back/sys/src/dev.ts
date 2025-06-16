import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const dev = new Elysia({ prefix: '/dev' })
    .group('/base', (app) =>
        app
            .post('/add', async ({ body }) => {
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
            .post('/remove', async ({ body }) => {
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
    .group('/user', (app) =>
        app
            .post('/add', async ({ body }) => {
                const { username, password, name, surname, role } = body;
                const hashed = await Bun.password.hash(password)

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
    )
