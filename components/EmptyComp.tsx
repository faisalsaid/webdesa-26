"use client";

//
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Folder, LucideIcon } from "lucide-react";

interface Props {
  title?: string;
  text?: string;
  desctiption?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}
const EmptyComp = ({
  icon: Icon,
  title = "No data",
  text,
  desctiption = "No data found",
  children,
}: Props) => {
  return (
    <div className="w-full border border-dashed rounded-xl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">{Icon ? <Icon /> : <Folder />}</EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{desctiption}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div>{text}</div>
          {children}
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyComp;
