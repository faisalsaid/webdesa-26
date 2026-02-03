"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TStaffDashboard } from "../_config/dto/dashboard.type";
import { useUserStore } from "@/store/curentUser.store";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, User, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import EmptyComp from "@/components/EmptyComp";
import { Button } from "@/components/ui/button";

interface Props {
  staff: TStaffDashboard[];
}

const StaffDashCard = ({ staff }: Props) => {
  const currentUser = useUserStore((state) => state.user);

  if (!staff || staff.length === 0) {
    return (
      <EmptyComp icon={User} desctiption="Tak ada info desa">
        <Link href={"/organitations/settings"}>
          <Button>Buat profil desa</Button>
        </Link>
      </EmptyComp>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-background h-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <CardTitle className="text-xl font-bold tracking-tight">
            Perangkat Desa
          </CardTitle>
          {currentUser?.role === "ADMIN" || currentUser?.role === "OPERATOR" ? (
            <Link href="/organitations">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent transition-colors"
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </Link>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative group overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 p-3 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 space-y-2">
            {staff.map((item) => (
              <StaffListCard staff={item} key={item.id} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StaffDashCard;

const StaffListCard = ({ staff }: { staff: TStaffDashboard }) => {
  // Ambil inisial nama untuk fallback avatar
  const initials = staff.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="group relative flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-border hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-all duration-200"
    >
      {/* Avatar Section */}
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
          {/* Asumsi ada field image di DTO, jika tidak ada fallback ke icon */}
          <AvatarImage src={staff.imageUrl as string} alt={staff.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials || <User2 size={20} />}
          </AvatarFallback>
        </Avatar>
        {/* Status Indicator (Hiasan) */}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {staff.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge
            variant="secondary"
            className="text-[10px] px-2 py-0 font-normal bg-zinc-100 dark:bg-zinc-800 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
          >
            {staff.positionType.name}
          </Badge>
        </div>
      </div>

      {/* Dekorasi Hover (Garis samping) */}
      <div className="absolute left-0 w-1 h-0 bg-primary rounded-full group-hover:h-2/3 transition-all duration-300" />
    </motion.div>
  );
};
