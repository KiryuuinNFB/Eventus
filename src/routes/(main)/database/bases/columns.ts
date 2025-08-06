import type { ColumnDef } from "@tanstack/table-core";

export type Base = {
  id: number,
  name: string,
  desc: string,
  location: string,
  teacher: string,
};

export const columns: ColumnDef<Base>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "ชื่อฐาน",
  },
  {
    accessorKey: "desc",
    header: "คำอธิบาย",
  },
  {
    accessorKey: "location",
    header: "ที่ตั้ง",
  },
  {
    accessorKey: "teacher",
    header: "อาจารย์",
  },
];