"use client";

import EmptyComp from "@/components/EmptyComp";
import { TResidentsDataTableResult } from "../_config/dto/resident.type";
import { User2 } from "lucide-react";
import { ResidentCard } from "./ResidentCard";

interface Props {
  residentDataTable: TResidentsDataTableResult;
}

const AllResidentsComp = ({ residentDataTable }: Props) => {
  if (residentDataTable.dataTable.length === 0) {
    return (
      <EmptyComp
        icon={User2}
        desctiption="Data tidak ditemukan"
        text="Pastikan kata kunci pencarian sudah sesuai"
      />
    );
  }
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {residentDataTable.dataTable.map((resident) => (
          <ResidentCard key={resident.id} resident={resident} />
        ))}
      </div>
    </div>
  );
};

export default AllResidentsComp;
