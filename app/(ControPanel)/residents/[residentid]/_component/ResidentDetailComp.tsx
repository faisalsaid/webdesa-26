"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { TResident, TResidentFormInput } from "../../_config/dto/resident.type";
import ResidentDetails from "./ResidentDetails";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Users2 } from "lucide-react";
import { DialogParentComp } from "@/components/DialogComp";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import ResidentForm from "../../_components/ResidentForm";
import { updateResidentByID } from "../../_config/actions/updateResidentById.actions";
import { toast } from "sonner";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import { softDeleteResident } from "../../_config/actions/softDeleteResident.action";
import { redirect } from "next/navigation";

interface Props {
  resident: TResident;
}
const ResidentDetailComp = ({ resident }: Props) => {
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const trigerUpdate = () => {
    setUpdateDialog(true);
  };

  const handleUpdate = (payload: TResidentFormInput) => {
    const toastID = toast.loading("Perbarui data penduduk ...");

    startTransition(async () => {
      const res = await updateResidentByID(payload);

      if (!res.success) {
        toast.error(res.message ? res.message : "Gagal perbarui penduduk", {
          id: toastID,
        });
        return;
      }

      toast.success(res.message ? res.message : "Berhasil perbarui penduduk", {
        id: toastID,
      });
      setUpdateDialog(false);
    });
  };

  const handleDelete = () => {
    const toastID = toast.loading("Hapus data penduduk ...");
    startTransition(async () => {
      const res = await softDeleteResident(resident.id);
      if (!res.success) {
        toast.error(res.message ? res.message : "Gagal hapus penduduk", {
          id: toastID,
        });
        return;
      }

      toast.success(res.message ? res.message : "Berhasil hapus penduduk", {
        id: toastID,
      });
      setUpdateDialog(false);
      redirect("/residents");
    });
  };

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Detail Penduduk</h1>
        <div className="flex gap-2">
          <Link href={"/residents"}>
            <Button size={"icon"} variant={"outline"} className="rounded-full">
              <Users2 />
            </Button>
          </Link>
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full text-rose-600"
            onClick={() => setDeleteDialog(true)}
          >
            <Trash2 />
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full text-emerald-600"
            onClick={trigerUpdate}
          >
            <Edit2 />
          </Button>
        </div>
      </ContentCard>
      <ResidentDetails resident={resident} />
      {/* DIALOG */}

      <div>
        <DialogParentComp
          title="Perbarui Data Penduduk"
          open={updateDialog}
          onOpenChange={setUpdateDialog}
          className="md:min-w-[50%]"
        >
          <>
            <Separator className="mb-4" />
            <ResidentForm defaultValues={resident} updated={handleUpdate} />
          </>
        </DialogParentComp>
        <ConfirmDialog
          cancelLabel="Batal"
          confirmLabel="Hapus"
          open={deleteDialog}
          onOpenChange={setDeleteDialog}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default ResidentDetailComp;
