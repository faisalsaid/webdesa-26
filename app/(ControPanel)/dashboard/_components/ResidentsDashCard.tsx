"use client";

import EmptyComp from "@/components/EmptyComp";
import { TResidentDashboard } from "../_config/dto/dashboard.type";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Mars, Venus } from "lucide-react";
import Link from "next/link";

interface Props {
  residents: TResidentDashboard[] | undefined;
}

const ResidentsDashCard = ({ residents }: Props) => {
  console.log(residents);

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
          <Link href="/residents">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </Link>
        </CardHeader>
        <CardContent className="">
          <div className="relative group overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 p-3 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 space-y-2">
            {residents.map((resident) => (
              <ResidentList key={resident.id} resident={resident} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResidentsDashCard;

const ResidentList = ({ resident }: { resident: TResidentDashboard }) => {
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
        <p>{resident.fullName}</p>
      </div>
      <div>
        <span>
          {resident.gender === "MALE" ? (
            <Mars size={16} className="text-sky-500" />
          ) : (
            <Venus size={16} className="text-pink-500" />
          )}
        </span>
      </div>
    </div>
  );
};
