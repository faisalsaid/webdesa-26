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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pending, starTransition] = useTransition();
  const [positionToUpdate, setPositionToUpdate] =
    useState<TStaffTypeFormInput | null>(null);

  const [updatePositionDialog, setUpdatePositionDialog] =
    useState<boolean>(false);

  const onSubmit = (payload: TStaffTypeFormInput) => {
    const isEdit = !!payload.id;
    console.log(isEdit);

    const toastId = toast.loading(
      isEdit ? "Ubah data jenis jabatan..." : "Menambah jenis jabatan...",
    );

    starTransition(async () => {
      if (isEdit) {
        const res = await updateStaffPosition(payload);
        if (!res.success) {
          toast.error(res.message ? res.message : "Gagal perbarui jabatan", {
            id: toastId,
          });
          return;
        }
        toast.success(res.message ? res.message : "Berhasil perbarui jabatan", {
          id: toastId,
        });
        setUpdatePositionDialog(false);
      } else {
        const res = await createStaffPosititon(payload);
        if (!res.success) {
          toast.error(res.message ? res.message : "Gagal menambah jabatan", {
            id: toastId,
          });
          return;
        }
        toast.success(res.message ? res.message : "Berhasil menambah jabatan", {
          id: toastId,
        });
        setOpenDialog(false);
      }
    });
  };

  const onUpdate = (initData: TStaffTypeFormInput) => {
    setPositionToUpdate(initData);
    setUpdatePositionDialog(true);
  };

  return (
    <ContentCard className="space-y-4">
      <div className="flex ga4 items-center justify-between">
        <h2>Daftar Jabatan Desa</h2>
        <div>
          {curentUser?.role === "ADMIN" ? (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  variant={"outline"}
                >
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Jenis Jabatan</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Separator />
                <StaffTypeForm getSubmit={onSubmit} />
              </DialogContent>
            </Dialog>
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
        <Dialog
          open={updatePositionDialog}
          onOpenChange={setUpdatePositionDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ubah data jabatan</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Separator />
            <StaffTypeForm
              getSubmit={onSubmit}
              initialData={positionToUpdate}
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
