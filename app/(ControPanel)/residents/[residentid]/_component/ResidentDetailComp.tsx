"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { TResident, TResidentFormInput } from "../../_config/dto/resident.type";
import ResidentDetails from "./ResidentDetails";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { DialogParentComp } from "@/components/DialogComp";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import ResidentForm from "../../_components/ResidentForm";
import { updateResidentByID } from "../../_config/actions/updateResidentById.actions";
import { toast } from "sonner";

interface Props {
  resident: TResident;
}
const ResidentDetailComp = ({ resident }: Props) => {
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
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

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Detail Penduduk</h1>
        <div className="flex gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full text-rose-600"
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
      </div>
    </div>
  );
};

export default ResidentDetailComp;
