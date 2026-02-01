"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/curentUser.store";
import { MessageCircleWarning, Plus } from "lucide-react";
import StaffTypeListCard from "./StaffTypeListCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StaffTypeForm from "./StaffTypeForm";
import { useState, useTransition } from "react";
import {
  TStaffPosition,
  TStaffTypeFormInput,
} from "../_config/dto/staffType.type";
import { toast } from "sonner";
import { createStaffPosititon } from "../_config/actions/createStaffPosititon.actions";
import EmptyComp from "@/components/EmptyComp";
import { updateStaffPosition } from "../_config/actions/updateStaffPosition.action";

interface Porps {
  staffPositions: TStaffPosition[] | undefined;
}

const StaffPositionList = ({ staffPositions }: Porps) => {
  const curentUser = useUserStore((state) => state.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [positionToUpdate, setPositionToUpdate] =
    useState<TStaffTypeFormInput | null>(null);

  const onSubmit = async (payload: TStaffTypeFormInput) => {
    const isEdit = !!payload.id;

    const toastId = toast.loading(
      isEdit ? "Ubah data jenis jabatan..." : "Menambah jenis jabatan...",
    );

    if (isEdit) {
      const res = await updateStaffPosition(payload);
      if (!res.success) {
        toast.error(res.message ?? "Gagal perbarui jabatan", { id: toastId });
        return;
      }
      toast.success(res.message ?? "Berhasil perbarui jabatan", {
        id: toastId,
      });
    } else {
      const res = await createStaffPosititon(payload);
      if (!res.success) {
        toast.error(res.message ?? "Gagal menambah jabatan", { id: toastId });
        return;
      }
      toast.success(res.message ?? "Berhasil menambah jabatan", {
        id: toastId,
      });
    }

    setDialogOpen(false);
  };

  const onUpdate = (initData: TStaffTypeFormInput) => {
    setPositionToUpdate(initData);
    setDialogOpen(true);
  };

  return (
    <ContentCard className="space-y-4 h-fit">
      <div className="flex ga4 items-center justify-between">
        <h2>Daftar Jabatan Desa</h2>
        <div>
          {curentUser?.role === "ADMIN" ? (
            <Button
              className="rounded-full"
              size={"icon"}
              variant={"outline"}
              onClick={() => {
                setPositionToUpdate(null); // mode CREATE
                setDialogOpen(true);
              }}
            >
              <Plus />
            </Button>
          ) : null}
        </div>
      </div>

      {!staffPositions ? (
        <UndifinedComp />
      ) : staffPositions.length === 0 ? (
        <EmptyComp
          text="Silahkan menambah jenis jabatan terlebih dahulu"
          desctiption="Jenis jabatan belum tersedia"
        />
      ) : (
        <div className="space-y-2">
          {staffPositions?.map((staffPosititon) => (
            <StaffTypeListCard
              key={staffPosititon.id}
              position={staffPosititon}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}

      <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {positionToUpdate
                  ? "Ubah Data Jabatan"
                  : "Tambah Jenis Jabatan"}
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <Separator />

            <StaffTypeForm
              getSubmit={onSubmit}
              initialData={positionToUpdate ?? undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
    </ContentCard>
  );
};

export default StaffPositionList;

const UndifinedComp = () => {
  return (
    <div className="flex items-center justify-center border border-dashed rounded-xl min-h-64 border-rose-500/50">
      <div className=" text-rose-500 text-center flex items-center flex-col gap-4">
        <MessageCircleWarning size={32} />
        <p className="">Ups!, tidak bisa mengambil list jabatan</p>
      </div>
    </div>
  );
};
