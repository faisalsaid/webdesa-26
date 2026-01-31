"use client";

import EmptyComp from "@/components/EmptyComp";
import { TResidentDashboard } from "../_config/dto/dashboard.type";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, LucideIcon, Mars, Venus } from "lucide-react";
import Link from "next/link";

import { Home, Clock, LogOut, Skull } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PopulationStatusLabels } from "../../residents/_config/dto/resident.enum";
import { useUserStore } from "@/store/curentUser.store";

interface Props {
  residents: TResidentDashboard[] | undefined;
  totalCount: number | undefined;
  stas:
    | {
        MALE: number;
        FEMALE: number;
      }
    | undefined;
}

const ResidentsDashCard = ({ residents, totalCount, stas }: Props) => {
  const currentUser = useUserStore((state) => state.user);

  if (residents?.length === 0 || !residents) {
    return <EmptyComp />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="text-xl font-bold tracking-tight">
            Penduduk
          </CardTitle>
          {currentUser?.role === "ADMIN" || currentUser?.role === "OPERATOR" ? (
            <Link href="/residents">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </Link>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative group overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 p-3 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 space-y-2">
            {residents.map((resident) => (
              <ResidentList key={resident.id} resident={resident} />
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="">Total : {totalCount} penududuk</p>
            <div className="flex items-center gap-3">
              <p>Pria : {stas?.MALE}</p>
              <p>Wanita : {stas?.FEMALE}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResidentsDashCard;

// 1. Konfigurasi Gender
const GENDER_CONFIG = {
  MALE: { icon: Mars, color: "text-sky-500", label: "Pria" },
  FEMALE: { icon: Venus, color: "text-pink-500", label: "Wanita" },
};

// 2. Konfigurasi Status Populasi
const STATUS_CONFIG = {
  DECEASED: { icon: Skull, color: "text-slate-500" },
  MOVED_OUT: { icon: LogOut, color: "text-amber-500" },
  TEMPORARY: { icon: Clock, color: "text-blue-500" },
  PERMANENT: { icon: Home, color: "text-emerald-500" },
};

const ResidentList = ({ resident }: { resident: TResidentDashboard }) => {
  const gender = GENDER_CONFIG[resident.gender as keyof typeof GENDER_CONFIG];
  const status =
    STATUS_CONFIG[resident.populationStatus as keyof typeof STATUS_CONFIG] ||
    STATUS_CONFIG.PERMANENT;
  return (
    <div
      className="border p-2 rounded-md flex
    items-center justify-between"
    >
      <div className=" flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-emerald-100 text-emerald-700">
            {resident.fullName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p>{resident.fullName}</p>
          <p className="text-xs text-muted-foreground"> NIK: {resident.nik}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <StatusIcon
          icon={gender.icon}
          label={gender.label}
          className={gender.color}
        />
        <StatusIcon
          icon={status.icon}
          label={PopulationStatusLabels[resident.populationStatus]}
          className={status.color}
        />
      </div>
    </div>
  );
};

const StatusIcon = ({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Icon size={18} className={className} />
    </TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);
