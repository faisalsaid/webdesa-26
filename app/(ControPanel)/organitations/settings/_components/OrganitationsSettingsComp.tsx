"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StaffPositionList from "./StaffPositionList";
import { Users2Icon } from "lucide-react";

const OrganitationsSettingsComp = () => {
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Atur Perangkat Desa</h1>
        <div>
          <Link href={"/organitations"}>
            <Button>
              <Users2Icon />
              <span>Semua Perangkat</span>
            </Button>
          </Link>
        </div>
      </ContentCard>

      <div className="grid gap-4 md:grid-cols-3">
        <ContentCard className="col-span-2"></ContentCard>
        <StaffPositionList />
      </div>
    </div>
  );
};

export default OrganitationsSettingsComp;
