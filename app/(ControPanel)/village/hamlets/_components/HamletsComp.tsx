"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import EmptyComp from "@/components/EmptyComp";
import AddHamletButton from "./AddHamletButton";

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
          <AddHamletButton />
        </div>
      </ContentCard>

      {!haveHamlet ? (
        <EmptyComp>
          <AddHamletButton />
        </EmptyComp>
      ) : (
        <div>Hallo</div>
      )}
    </div>
  );
};

export default HamletsComp;
