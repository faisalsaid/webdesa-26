import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "../../_config/dto/user.type";
import UserRolesCells from "./UserRolesCells";
import DeleteUserComp from "../DeleteUserComp";

export const userColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",

    cell: ({ row }) => (
      <UserRolesCells
        user={{
          id: row.original.id,
          role: row.original.role,
          name: row.original.name,
        }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) => (
      <div>{row.original.createdAt.toLocaleDateString("en-ID")}</div>
    ),
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <DeleteUserComp id={row.original.id} />
          <div>Hapus</div>
        </div>
      );
    },
  },
];
