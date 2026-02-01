"use client";

import ContentCard from "@/app/(ControPanel)/_components/ContentCard";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/curentUser.store";
import { Plus } from "lucide-react";
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
import { TStaffTypeFormInput } from "../_config/dto/staffType.type";
import { toast } from "sonner";
import { createStaffPosititon } from "../_config/actions/createStaffPosititon.actions";

const StaffPositionList = () => {
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
      <div className="space-y-2">
        <StaffTypeListCard />
        <StaffTypeListCard />
        <StaffTypeListCard />
        <StaffTypeListCard />
      </div>
    </ContentCard>
  );
};

export default StaffPositionList;
