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

const AddResidentButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Tambah Warga</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan Warga Baru</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Separator />
        <ResidentForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddResidentButton;
