import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "../../_config/dto/user.type";

export const userColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
];
