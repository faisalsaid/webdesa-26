"use client";

import {
  ArrowUpRight,
  Building2,
  Landmark,
  MapPin,
  Navigation,
} from "lucide-react";

import { TVillageDashboard } from "../_config/dto/dashboard.type";
import Link from "next/link";
import EmptyComp from "@/components/EmptyComp";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VillageProfileCard = ({
  village,
}: {
  village: TVillageDashboard | null;
}) => {
  if (!village) {
    return (
      <EmptyComp icon={Landmark} desctiption="Tak ada info desa">
        <Link href={"/village/update"}>
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
      <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              Profil Desa
            </CardTitle>
            <Badge variant="secondary" className="font-mono text-[10px]">
              ID: {village.villageCode}
            </Badge>
          </div>
          <Link href="/village">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </Link>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Main Info Box */}
          <div className="relative group overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 p-4 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-white dark:bg-zinc-800 shadow-sm">
                  <Landmark className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Desa
                  </p>
                  <p className="font-bold text-lg leading-none">
                    {village.villageName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 size={12} />
                    <span className="text-[10px] font-medium uppercase">
                      Kecamatan
                    </span>
                  </div>
                  <p className="text-sm font-semibold">
                    {village.districtName}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Navigation size={12} />
                    <span className="text-[10px] font-medium uppercase">
                      Kabupaten
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{village.regencyName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <MapPin size={12} className="text-red-500" />
                <span>Provinsi {village.provinceName}</span>
              </div>
            </div>

            {/* Dekorasi Background Animation */}
            <motion.div
              className="absolute -right-4 -bottom-4 text-zinc-300 dark:text-zinc-800 opacity-20"
              whileHover={{ scale: 1.2, rotate: -10 }}
            >
              <Landmark size={100} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VillageProfileCard;
