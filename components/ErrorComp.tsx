"use client";

import { MessageCircleWarning } from "lucide-react";

interface Props {
  title?: string;
  iconSize?: number;
  descriptions?: string;
}

const ErrorComp = ({
  title = "Error",
  iconSize = 32,
  descriptions = "Ups! Something wrong.",
}: Props) => {
  return (
    <div className="border border-dashed p-4 min-h-64 flex items-center justify-center text-rose-500 border-rose-500/50 rounded-xl">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <MessageCircleWarning size={iconSize} />
        <div className="">
          <p className="text-lg">{title}</p>
          <p className="">{descriptions}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComp;
