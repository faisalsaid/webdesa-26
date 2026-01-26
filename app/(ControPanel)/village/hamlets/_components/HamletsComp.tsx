"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import EmptyComp from "@/components/EmptyComp";
import AddHamletButton from "./AddHamletButton";
import { THamletDataTableResult } from "../_config/actions/getHamletDataTable.action";
import HamletTableComp from "./HamletTableComp";

interface Props {
  haveHamlet: boolean;
  hamletDataTableResult: THamletDataTableResult;
}

const HamletsComp = ({ haveHamlet, hamletDataTableResult }: Props) => {
  const hamletDataTabel = hamletDataTableResult.data?.dataTable;

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
        <div>
          {hamletDataTabel?.length === 0 ? (
            <EmptyComp text="Data yang dicari tak ada" />
          ) : (
            <HamletTableComp data={hamletDataTableResult?.data} />
          )}
        </div>
      )}
    </div>
  );
};

export default HamletsComp;
