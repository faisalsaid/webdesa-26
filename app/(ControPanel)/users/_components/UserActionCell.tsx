"use client";

import { Button } from "@/components/ui/button";
import DeleteUserComp from "./DeleteUserComp";
import { Eye } from "lucide-react";

import Link from "next/link";

const UserActionCell = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <DeleteUserComp id={id} />
      <Link href={`/users/${id}`}>
        <Button
          size={"icon"}
          className="rounded-full text-emerald-500"
          variant={"outline"}
        >
          <Eye />
        </Button>
      </Link>
    </div>
  );
};

export default UserActionCell;
