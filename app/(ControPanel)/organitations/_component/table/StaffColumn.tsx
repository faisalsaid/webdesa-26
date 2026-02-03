"use client";
"use no compiler";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TStaffDataTable } from "../../_config/dto/staff.type";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit2, GripVertical, Trash2 } from "lucide-react";
import { Span } from "next/dist/trace";

export type Staff = {
  id: string;
  name: string;
  email: string;
};

interface ColumnActions {
  onEdit: (staff: TStaffDataTable) => void;
  onDelete: (id: number) => void;
}

export const staffColumns = ({
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<TStaffDataTable>[] => [
  { id: "sort", header: () => <GripVertical />, cell: () => <GripVertical /> },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "position",
    header: "Jabatan",
    cell: ({ row }) => <div>{row.original.positionType.name}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isActive === true ? (
          <Tooltip>
            <TooltipTrigger>
              <div className="size-3 bg-green-300 rounded-full" />
            </TooltipTrigger>
            <TooltipContent>Aktif</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <div className="size-3 bg-rose-500 rounded-full" />
            </TooltipTrigger>
            <TooltipContent>Tidak aktif</TooltipContent>
          </Tooltip>
        )}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Mulai",
    cell: ({ row }) => (
      <p>{row.original.startDate.toLocaleDateString("en-ID")}</p>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Berkhir",
    cell: ({ row }) => (
      <p>
        {row.original.endDate ? (
          row.original.endDate.toLocaleDateString("en-ID")
        ) : (
          <span className="italic text-muted-foreground">-</span>
        )}
      </p>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => onEdit(staff)}
              >
                <Edit2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Perbarui</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="rounded-full"
                onClick={() => onDelete(staff.id)}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
