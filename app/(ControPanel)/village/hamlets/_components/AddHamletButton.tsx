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
import { useState } from "react";

const AddHamletButton = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
        <HamletForm setModal={() => setDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddHamletButton;
