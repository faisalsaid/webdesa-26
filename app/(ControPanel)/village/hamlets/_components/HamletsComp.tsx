"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import EmptyComp from "@/components/EmptyComp";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  haveHamlet: boolean;
}

const HamletsComp = ({ haveHamlet }: Props) => {
  console.log(haveHamlet);

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dusun</h1>
        <div>
          <Button>
            <Plus />
            <span>Buat Dusun</span>
          </Button>
        </div>
      </ContentCard>

      {!haveHamlet ? (
        <EmptyComp>
          <Button>
            <Plus />
            <span>Buat Dusun</span>
          </Button>
        </EmptyComp>
      ) : (
        <div>Hallo</div>
      )}
    </div>
  );
};

export default HamletsComp;
