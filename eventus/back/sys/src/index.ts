import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia, t } from "elysia";
import { PrismaClient} from "@prisma/client";

const crypto = require('crypto');

function hashpswd(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const prisma = new PrismaClient()

const app = new Elysia()
  .use(swagger())
  .use(logger())
  .get("/", () => "amongus")
  .get("/user/:id", ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  
  //create user directly
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
  )
  .listen(3000);

console.log(
  `Elysia at http://${app.server?.hostname}:${app.server?.port}`
);