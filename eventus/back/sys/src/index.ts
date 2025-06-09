import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";

const app = new Elysia()
  .use(swagger())
  .use(logger())
  .get("/", () => "amongus")
  .get("/user/:id", ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post('/test', ({ body }) =>  {
    return body
  })
  .listen(3000);

console.log(
  `Elysia at http://${app.server?.hostname}:${app.server?.port}`
);