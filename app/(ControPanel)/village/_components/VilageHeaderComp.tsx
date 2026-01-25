"use client";

import Link from "next/link";
import ContentCard from "../../_components/ContentCard";

import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface Props {
  haveData: boolean;
}

const VillageHeaderComp = ({ haveData }: Props) => {
  console.log(haveData);

  return (
    <ContentCard>
      <div className="flex items-center justify-between">
        <h1>Profil Desa</h1>

        {haveData && (
          <Link href={"/village/update"}>
            <Button>
              <Edit2 />
              <span>Perbarui informasi</span>
            </Button>
          </Link>
        )}
      </div>
    </ContentCard>
  );
};

export default VillageHeaderComp;
