"use client";

import { Button } from "@/components/ui/button";
import ContentCard from "../../_components/ContentCard";
import { Plus } from "lucide-react";

const FamiliesComp = () => {
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between gap-4">
        <h1 className="text-xl">Keluarga</h1>
        <div>
          <Button>
            <Plus />
            <span>Tambah Keluarga</span>
          </Button>
        </div>
      </ContentCard>
      <div>Famlity Statistic</div>
      <div>Family Table</div>
    </div>
  );
};

export default FamiliesComp;
