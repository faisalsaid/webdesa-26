"use client";

import ContentCard from "../../_components/ContentCard";
import { SquareArrowOutUpRight, UserRoundX } from "lucide-react";
import Link from "next/link";
import EmptyComp from "@/components/EmptyComp";
import { TStaffDataTableResult } from "../_config/dto/staff.type";
import AllStaffComp from "./AllStaffComp";
import { useStaffPositionOptionsStore } from "@/store/staffPostitionsOptions.store";
import { TStaffPositionOptions } from "../settings/_config/dto/staffType.type";

interface Props {
  haveStaff: boolean;
  staffDataTable: TStaffDataTableResult | undefined;
  positionOptions: TStaffPositionOptions[];
}

const OrganitationsComp = ({
  haveStaff,
  staffDataTable,
  positionOptions,
}: Props) => {
  useStaffPositionOptionsStore
    .getState()
    .setStaffPositionsOptions(positionOptions);
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1>Perangkat Desa</h1>

        <div>
          <Link
            href={"/organitations/settings"}
            className="flex items-center justify-center gap-2 text-emerald-500 hover:text-emerald-300"
          >
            <span>Pengaturan</span>
            <SquareArrowOutUpRight size={16} />
          </Link>
        </div>
      </ContentCard>

      {!haveStaff ? <StaffEmptyComp /> : <AllStaffComp data={staffDataTable} />}
    </div>
  );
};

export default OrganitationsComp;

const StaffEmptyComp = () => {
  return (
    <EmptyComp
      icon={UserRoundX}
      title="Tak ada data"
      desctiption="Staff belum tersedia"
      text="Silakah masuk halaman pengaturan untuk menambah staff"
    >
      <Link
        href={"/organitations/settings"}
        className="flex items-center justify-center gap-2 text-emerald-500 hover:text-emerald-300"
      >
        <span>Pengaturan</span>
        <SquareArrowOutUpRight size={16} />
      </Link>
    </EmptyComp>
  );
};
