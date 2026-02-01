"use client";

import {
  Edit2,
  EllipsisVertical,
  MoreHorizontalIcon,
  Trash2,
  User,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TStaffPosition,
  TStaffTypeFormInput,
} from "../_config/dto/staffType.type";
import { useUserStore } from "@/store/curentUser.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
  position: TStaffPosition;
  onUpdate: (payload: TStaffTypeFormInput) => void;
  onDelete: (id: number) => void;
}
const StaffTypeListCard = ({ position, onUpdate, onDelete }: Props) => {
  const curentUser = useUserStore((state) => state.user);

  return (
    <div className="flex items-center justify-between gap-2 p-2 border  bg-background rounded-lg">
      <div className=" flex items-center gap-1 flex-1">
        <EllipsisVertical />
        <div className="flex-1">
          <p className="line-clamp-1">{position.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {position.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {position.isUnique ? (
          <Tooltip>
            <TooltipTrigger>
              <User size={18} className="text-orange-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Jabatan Tunggal</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <Users size={18} className="text-sky-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Jabatan Ganda</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger>
            {position.staffAssignments.length === 0 ? (
              <div className="text-xs size-5  rounded-full text-white flex items-center  justify-center   bg-slate-200 dark:bg-slate-700 ">
                0
              </div>
            ) : (
              <div className="text-xs size-5 bg-green-500 rounded-full text-white flex items-center  justify-center">
                {position.staffAssignments.length}
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>Jumlah perangkat</p>
          </TooltipContent>
        </Tooltip>

        {curentUser?.role === "ADMIN" ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="More Options">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24" align="center">
                <DropdownMenuItem
                  className="w-full flex items-center justify-center"
                  onClick={() => onUpdate(position)}
                >
                  <Edit2 />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full flex items-center justify-center text-rose-500 "
                  onClick={() => onDelete(position.id)}
                >
                  <Trash2 className="text-rose-500" />
                  <span>Hapus</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StaffTypeListCard;
