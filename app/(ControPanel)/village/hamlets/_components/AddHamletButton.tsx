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
import HamletForm from "./HamletForm";

const AddHamletButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Buat Dusun</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Dusun Baru</DialogTitle>
          <DialogDescription>Pastikan nama dusun sesuai</DialogDescription>
        </DialogHeader>

        <Separator />
        <HamletForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddHamletButton;
