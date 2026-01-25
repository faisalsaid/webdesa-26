"use client";

import { redirect } from "next/dist/server/api-utils";
import { TResidentsDataTableResult } from "../_config/dto/resident.type";
import ContentCard from "../../_components/ContentCard";
import { Button } from "@/components/ui/button";
import { Plus, Users2 } from "lucide-react";
import EmptyComp from "@/components/EmptyComp";

interface Props {
  residentDataTable: TResidentsDataTableResult | undefined;
  haveResident: boolean;
}

const ResidentsContentComp = ({ residentDataTable, haveResident }: Props) => {
  if (!residentDataTable) {
    return (
      <div className="min-h-72 flex items-center justify-center border border-dashed rounded-2xl border-pink-700/50">
        <div className="text-2xl text-pink-500">Ups! Something Wrong.</div>
      </div>
    );
  }

  // if (residentDataTable.dataTable.length === 0) {
  //   return <div>Data Empty</div>;
  // }
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1>Data Penduduk</h1>
        <div>
          <Button>
            <Plus />
            <span>Tambah Penduduk</span>
          </Button>
        </div>
      </ContentCard>

      {haveResident ? (
        <EmptyComp
          icon={Users2}
          title="Tak Ada Data"
          desctiption="Data penduduk tidak ditemukan"
        >
          <Button>
            <Plus />
            <span>Tambah Penduduk</span>
          </Button>
        </EmptyComp>
      ) : null}
    </div>
  );
};

export default ResidentsContentComp;
