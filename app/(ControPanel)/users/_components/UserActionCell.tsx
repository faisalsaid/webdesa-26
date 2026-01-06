"use client";

import { Button } from "@/components/ui/button";
import DeleteUserComp from "./DeleteUserComp";
import { Eye } from "lucide-react";

import Link from "next/link";
import { useUserStore } from "@/store/curentUser.store";

const UserActionCell = ({ id }: { id: string }) => {
  const currentUser = useUserStore((state) => state.user);

  return (
    <div className="flex items-center justify-center gap-4">
      {currentUser?.role === "ADMIN" ? <DeleteUserComp id={id} /> : null}

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
