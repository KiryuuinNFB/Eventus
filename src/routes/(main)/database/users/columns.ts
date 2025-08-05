import type { ColumnDef } from "@tanstack/table-core";

export type User = {
  username: string,
  name: string,
  surname: string,
  role: "ADMIN" | "USER" | "MOD",
  grade: number,
  room: number
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "รหัสนักเรียน",
  },
  {
    accessorKey: "name",
    header: "ชื่อ",
  },
  {
    accessorKey: "surname",
    header: "นามสกุล",
  },
  {
    accessorKey: "role",
    header: "ตำแหน่ง",
  },
  {
    accessorKey: "grade",
    header: "ระดับชั้น",
  },
  {
    accessorKey: "room",
    header: "ห้อง",
  },
];