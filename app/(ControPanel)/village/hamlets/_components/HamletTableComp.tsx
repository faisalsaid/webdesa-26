"use client";

import EmptyComp from "@/components/EmptyComp";
import { THamletsDataTable } from "../_config/dto/hamlet.type";
import HamletCard from "./HamletCard";

interface Props {
  data: THamletsDataTable | undefined;
}

const HamletTableComp = ({ data }: Props) => {
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-72 border border-dashed rounded-2xl">
        Data tidak ditemukan
      </div>
    );

  const { meta, dataTable } = data;

  return (
    <div>
      <div>
        {dataTable.length === 0 ? (
          <EmptyComp text="Hasil pencarian nihil"></EmptyComp>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataTable.map((hamlet) => (
              <HamletCard key={hamlet.id} hamlet={hamlet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HamletTableComp;
