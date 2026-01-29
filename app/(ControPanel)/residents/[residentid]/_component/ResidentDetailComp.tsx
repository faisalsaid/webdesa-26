"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { TResident } from "../../_config/dto/resident.type";
import ResidentDetails from "./ResidentDetails";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
  resident: TResident;
}
const ResidentDetailComp = ({ resident }: Props) => {
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Detail Penduduk</h1>
        <div className="flex gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full text-rose-600"
          >
            <Trash2 />
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full text-emerald-600"
          >
            <Edit2 />
          </Button>
        </div>
      </ContentCard>
      <ResidentDetails resident={resident} />
    </div>
  );
};

export default ResidentDetailComp;
