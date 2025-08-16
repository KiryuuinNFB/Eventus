// Use dynamic public env for runtime
import { env } from '$env/dynamic/public';

const HOSTNAME = env.PUBLIC_HOSTNAME;
export const API_ELYSIA = `${HOSTNAME}:${env.PUBLIC_API_PORT}`;
export const PRISMA_STUDIO = `${HOSTNAME}:${env.PUBLIC_PRISMA_PORT}`;
