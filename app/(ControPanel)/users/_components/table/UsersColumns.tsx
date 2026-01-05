import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "../../_config/dto/user.type";
import UserRolesCells from "./UserRolesCells";

export const userColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",

    cell: ({ row, table }) => (
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
];
