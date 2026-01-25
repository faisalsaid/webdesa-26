"use client";

import EmptyComp from "@/components/EmptyComp";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";
import { VillageResult } from "../_config/actions/getViilageInfo.action";
import Link from "next/link";

interface Props {
  bucket: VillageResult;
}

const VillageContentComp = ({ bucket }: Props) => {
  if (bucket?.message === "Village data is null") {
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

  return <div>Hallo</div>;
};

export default VillageContentComp;
