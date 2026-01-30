"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Edit2,
  Eye,
  Fingerprint,
  Trash2,
  User2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { format } from "date-fns" // Optional: untuk formatting tanggal
import { TResidentsDataTable } from "../_config/dto/resident.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  resident: TResidentsDataTable;
  onUpdate: (urlId: string) => void;
  onDelete: (id: number) => void;
}

export function ResidentCard({ resident, onUpdate, onDelete }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-white dark:bg-zinc-950 shadow-md transition-shadow hover:shadow-xl hover:shadow-emerald-500/10">
        {/* Dekorasi Background */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10" />

        <CardHeader className="flex flex-row items-center gap-4 pb-4">
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <Avatar className="h-16 w-16 border-2 border-emerald-500/20">
              <AvatarImage
                src={resident.imageUrl as string}
                alt={resident.fullName}
              />
              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                {resident.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-950 ${resident.populationStatus === "PERMANENT" ? "bg-emerald-500" : "bg-amber-500"}`}
            />
          </motion.div>

          <div className="flex flex-col space-y-1">
            <h3 className="font-bold text-lg leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
              {resident.fullName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Fingerprint className="h-3 w-3 text-emerald-600" />
              <span className="font-mono uppercase">{resident.nik}</span>
            </div>
            <Badge
              variant="secondary"
              className="w-fit bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
            >
              {resident.populationStatus}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 text-sm border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <User2 className="h-4 w-4 text-emerald-500" />
              <span>
                {resident.gender === "MALE" ? "Laki-laki" : "Perempuan"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Calendar className="h-4 w-4 text-emerald-500" />
              {/* <span>{new Date(resident.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span> */}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <CreditCard className="h-4 w-4 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-emerald-600">
                  No. KK
                </span>
                <span className="font-mono">
                  {resident?.family?.familyCardNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-2 mt-2">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
              <div>
                <span>{new Date(resident.createdAt).getFullYear()}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  className="rounded-full hover:text-rose-600"
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => onDelete(resident.id)}
                >
                  <Trash2 />
                </Button>
                <Button
                  className="rounded-full hover:text-emerald-600"
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => onUpdate(resident.urlId)}
                >
                  <Edit2 />
                </Button>

                <Link href={`/residents/${resident.urlId}`}>
                  <Button
                    className="rounded-full hover:text-sky-600"
                    size={"icon"}
                    variant={"outline"}
                  >
                    <Eye />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
