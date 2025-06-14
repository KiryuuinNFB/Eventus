import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia, status, t } from "elysia";
import { admin } from "./admin"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const crypto = require('crypto');

function hashpswd(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const app = new Elysia()
  .use(swagger())
  .use(logger())
  //admin commands for adding, removing and reading users
  .use(admin)
  .get("/", () => "amongus")
  .group('/auth', (app) => 
    app
      .post('/signin', async ({ jwt, body }) => {
        const { username, password } = body;
        const hashed = hashpswd(password);
        const signin = await prisma.user.findUnique({
          where: {
            username: username,
            password: hashed
          }
        });
        if (hashed != signin?.password) {
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
          password: t.String(),
        })
      })


  )
  
  .listen(3000);

console.log(
  `Elysia at http://${app.server?.hostname}:${app.server?.port}`
);