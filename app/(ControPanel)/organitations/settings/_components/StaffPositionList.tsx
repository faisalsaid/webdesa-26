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

interface Porps {
  staffPositions: TStaffPosition[] | undefined;
}

const StaffPositionList = ({ staffPositions }: Porps) => {
  const curentUser = useUserStore((state) => state.user);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pending, starTransition] = useTransition();

  const onSubmit = (payload: TStaffTypeFormInput) => {
    const toastId = toast.loading("Menambah jenis jabatan");

    starTransition(async () => {
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
    });
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
            <StaffTypeListCard key={staffPosititon.id} />
          ))}
        </div>
      )}
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
