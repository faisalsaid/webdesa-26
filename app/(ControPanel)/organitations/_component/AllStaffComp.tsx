"use client";

import ErrorComp from "@/components/ErrorComp";
import { TStaffDataTableResult } from "../_config/dto/staff.type";
import StaffTableComp from "./table/StaffTableComp";

interface Props {
  data: TStaffDataTableResult | undefined;
}

const AllStaffComp = ({ data }: Props) => {
  if (!data) {
    return <ErrorComp />;
  }
  return (
    <div className="space-y-4">
      <div>Search Bar</div>
      <StaffTableComp dataTable={data.dataTable} />
      <div>Paginations</div>
    </div>
  );
};

export default AllStaffComp;
