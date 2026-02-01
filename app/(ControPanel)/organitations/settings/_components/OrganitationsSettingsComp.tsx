"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StaffPositionList from "./StaffPositionList";
import { Users2Icon } from "lucide-react";
import {
  TStaffFormInput,
  TStaffPosition,
  TStaffPositionOptions,
} from "../_config/dto/staffType.type";
import StaffForm from "./StaffForm";
import { toast } from "sonner";
import { createStaff } from "../_config/actions/createStaff.action";

interface Porps {
  staffPositions: TStaffPosition[] | undefined;
  positionOptions: TStaffPositionOptions[];
}

const OrganitationsSettingsComp = ({
  staffPositions,
  positionOptions,
}: Porps) => {
  const onSubmit = async (payload: TStaffFormInput) => {
    const toasId = toast.loading("Menambah perkangkat desa...");

    const res = await createStaff(payload);
    if (!res.success) {
      toast.error(res.message ? res.message : "Gagal menambah perangkat desa", {
        id: toasId,
      });
      return;
    }
    toast.success(
      res.message ? res.message : "Berhasil menambah perangkat desa",
      { id: toasId },
    );
  };
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
        <ContentCard className="col-span-2 h-fit">
          <StaffForm onSubmit={onSubmit} positionOptions={positionOptions} />
        </ContentCard>
        <StaffPositionList staffPositions={staffPositions} />
      </div>
    </div>
  );
};

export default OrganitationsSettingsComp;
