import type { ColumnDef } from "@tanstack/table-core";

export type User = {
    username: string;
    name: string;
    role: "USER" | "MOD" | "ADMIN";

}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];