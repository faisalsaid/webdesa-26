"use client";

import { EllipsisVertical, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StaffTypeListCard = () => {
  return (
    <div className="flex items-center justify-between gap-2 p-2 border  bg-background rounded-lg">
      <div className=" flex items-center gap-1 flex-1">
        <EllipsisVertical />
        <div className="flex-1">
          <p className="line-clamp-1">Kepala Desa</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            Penanggung jawab utama urusan desa
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger>
            <User size={18} className="text-orange-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Jabatan Tunggal</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default StaffTypeListCard;
