"use client";

import EmptyComp from "@/components/EmptyComp";
import { TStaffDataTable } from "../../_config/dto/staff.type";
import { CircleQuestionMark } from "lucide-react";
import { StaffDataTable } from "./StaffDataTable";
import { staffColumns } from "./StaffColumn";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Separator } from "@/components/ui/separator";
import StaffForm from "../../settings/_components/StaffForm";
import { TStaffFormInput } from "../../settings/_config/dto/staffType.type";
import { updateStaff } from "../../_config/actions/updateStaff.action";
import { toast } from "sonner";
import { deleteStaff } from "../../_config/actions/deleteStaff.action";

interface Props {
  dataTable: TStaffDataTable[];
}
const StaffTableComp = ({ dataTable }: Props) => {
  const [staff, setStaff] = useState<TStaffDataTable | undefined>(undefined);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [staffIdToDelete, setStaffIdToDelete] = useState<number | null>(null);

  const onUpdate = (staff: TStaffDataTable) => {
    setStaff(staff);
    setUpdateDialog(true);
  };

  const handleUpdate = async (staff: TStaffFormInput) => {
    const taosId = toast.loading("Perbarui data perangkat...");

    const res = await updateStaff(staff);

    if (!res.success) {
      toast.error(res.message ? res.message : "Gagal perbarui data perangkat", {
        id: taosId,
      });
      return;
    }

    toast.success(
      res.message ? res.message : "berhasil perbarui data perangkat",
      { id: taosId },
    );
    setUpdateDialog(false);
  };

  const trigerDelete = (id: number) => {
    setStaffIdToDelete(id);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!staffIdToDelete) {
      toast.error("Silahkan pilih perangkat yang ingin dihapus");
      return;
    }
    const taosId = toast.loading("Hapus perangkat...");

    const res = await deleteStaff(staffIdToDelete);

    if (!res.success) {
      toast.error(res.message ? res.message : "Gagal hapus perangkat", {
        id: taosId,
      });
      return;
    }

    toast.success(res.message ? res.message : "Berhasil hapus perangkat", {
      id: taosId,
    });
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
    <>
      <StaffDataTable
        columns={staffColumns({
          onEdit: onUpdate,
          onDelete: trigerDelete,
        })}
        data={dataTable}
      />
      {/* DILAOG */}

      <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
        <DialogContent className="md:min-w-[50%]">
          <DialogHeader>
            <DialogTitle>Perbarui Data Penduduk</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Separator />
          <StaffForm onSubmit={handleUpdate} initialData={staff} />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        title="Yakin Hapus Perangkat"
        onConfirm={handleDelete}
        onOpenChange={setDeleteDialog}
        open={deleteDialog}
        description={"Perangkat akan terhapus, tindakan ini tidak bisa diralat"}
        cancelLabel="Jangan Hapus"
        confirmLabel="Ya, Hapus Perangkat"
      />
    </>
  );
};

export default StaffTableComp;
