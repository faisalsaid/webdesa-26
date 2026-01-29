"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReusableDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function DialogParentComp({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}: ReusableDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Trigger bersifat opsional jika ingin dikontrol secara eksternal */}
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={className || "sm:max-w-106.25"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description && description}</DialogDescription>
        </DialogHeader>

        {/* Children bisa berupa Form, Text, atau Component lain */}
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
