"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import ResidentForm from "./ResidentForm";
import { TResidentFormInput } from "../_config/dto/resident.type";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createResident } from "../_config/actions/createResident.action";

const AddResidentButton = () => {
  // const [resident, setResident] = useState<TResidentFormInput | undefined>();
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const trigerCreate = (resident: TResidentFormInput) => {
    console.log(resident);
    startTransition(async () => {
      const res = await createResident(resident);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setOpenDialog(false);
      toast.success(res.message);
    });
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Tambah Warga</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[75%] md:min-w-[85%] w-full">
        <DialogHeader>
          <DialogTitle>Tambahkan Warga Baru</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Separator />
        <ResidentForm onCreate={trigerCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default AddResidentButton;
