import { Elysia, status, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { jwt } from '@elysiajs/jwt'

interface JwtPayload {
  username: string
}

const crypto = require('crypto');

function hashpswd(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
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
          .post('/add', async ({ body }) => {
            const { username, password, role } = body;
            const hashed = hashpswd(password);
            const user = await prisma.user.create({
              data: {
                username,
                password: hashed,
                role: role ?? 'USER'
              },
            });
    
            return {
              id: user.id,
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
          .post('/remove', async ({ body }) => {
            const { username, password } = body;
            const hashed = hashpswd(password);
            const deluser = await prisma.user.delete({
              where: {
                username: username,
                password: hashed
              }
            });
    
            return {
              id: deluser.id,
            };
    
          }, {
            body: t.Object({
              username: t.String(),
              password: t.String()
            })
          })
          .get('/:username', async ({ jwt, params: {username}, headers: { authorization }}) => {
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
              id: getuser?.id,
              role: getuser?.role
            };
    
          } , {
            body: t.Object({
              username: t.String()
            })
          })
        )
    