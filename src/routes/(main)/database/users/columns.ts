import type { ColumnDef } from "@tanstack/table-core";

export type User = {
  username: string,
  prefix: string,
  name: string,
  surname: string,
  role: string,
  grade: number,
  room: number
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "รหัสนักเรียน",
  },
  {
  accessorKey: "prefix",
  header: "คำนำหน้า",
  cell: ({ row }) => {
    const value = row.getValue<string>("prefix");

    const prefixMap: Record<string, string> = {
      DekChai: "ด.ช.",
      DekYing: "ด.ญ.",
      Nai: "นาย",
      Nang: "นาง",
      NangSao: "นางสาว",
    };

    return prefixMap[value] || value;
  },
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
    cell: ({ row }) => {
      const value = row.getValue<string>("role");
      const roleMap: Record<string, string> = {
        ADMIN: "ผู้ดูแลระบบ",
        USER: "ผู้ใช้",
        MOD: "พี่ฐาน"
      };
      return roleMap[value] || value;
    },
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