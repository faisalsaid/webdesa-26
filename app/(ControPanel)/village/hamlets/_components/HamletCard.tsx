"use client";

import { Card } from "@/components/ui/card";
import { THamlets } from "../_config/dto/hamlet.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  hamlet: THamlets;
}

const HamletCard = ({ hamlet }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden border-muted bg-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 dark:bg-zinc-950/50 dark:backdrop-blur-sm">
        <div className="flex flex-col md:flex-row min-h-64">
          {/* Bagian Gambar dengan Overlay */}
          <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden rounded-lg ml-4">
            <Image
              src={"/img/kantor-desa.jpeg"}
              alt={hamlet.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 40vw"
              loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-card/10" />
          </div>

          {/* Konten Konten */}
          <div className="flex flex-col justify-between p-6 w-full md:w-3/5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <MapPin size={16} className="animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase">
                  Hamlet Region
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {hamlet.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {hamlet.descriptions ||
                  "No description available for this hamlet."}
              </p>
            </div>

            {/* Actions Button */}
            <div className="flex items-center justify-between pt-4 border-t border-muted/50">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Edit2 size={18} />
                </Button>
              </div>

              <Button
                variant="link"
                className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View Details →
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HamletCard;
