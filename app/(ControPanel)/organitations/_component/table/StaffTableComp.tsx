"use client";

import EmptyComp from "@/components/EmptyComp";
import { TStaffDataTable } from "../../_config/dto/staff.type";
import { CircleQuestionMark } from "lucide-react";
import { StaffDataTable } from "./StaffDataTable";
import { staffColumns } from "./StaffColumn";

interface Props {
  dataTable: TStaffDataTable[];
}
const StaffTableComp = ({ dataTable }: Props) => {
  const handleEdit = (staff: TStaffDataTable) => {
    console.log(staff);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };
  if (dataTable.length === 0) {
    return (
      <EmptyComp
        icon={CircleQuestionMark}
        desctiption="Data tak ditemukan"
        text="Pastikan kata kunci pencarian sudah seusai dengan data perangkat desa"
      />
    );
  }
  return (
    <StaffDataTable
      columns={staffColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      })}
      data={dataTable}
    />
  );
};

export default StaffTableComp;
