"use client";

import EmptyComp from "@/components/EmptyComp";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";
import { VillageResult } from "../_config/actions/getViilageInfo.action";
import Link from "next/link";
import TabsVillageConfig from "./TabsVillageConfig";

interface Props {
  bucket: VillageResult;
}

const VillageContentComp = ({ bucket }: Props) => {
  if (bucket?.message === "Village data is null" || bucket.data === undefined) {
    return (
      <EmptyComp
        icon={Landmark}
        title="Tak ada data"
        desctiption="Data tidak ditemukan"
      >
        <Link href={"/village/update"}>
          <Button>Buat Data Desa</Button>
        </Link>
      </EmptyComp>
    );
  }

  return (
    <div>
      <TabsVillageConfig data={bucket?.data} />
    </div>
  );
};

export default VillageContentComp;
