"use client";

import EmptyComp from "@/components/EmptyComp";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

const VillageContentComp = () => {
  return (
    <div>
      <EmptyComp
        icon={Landmark}
        title="Tak ada data"
        desctiption="Data tidak ditemukan"
      >
        <Button>Buat Data Desa</Button>
      </EmptyComp>
    </div>
  );
};

export default VillageContentComp;
