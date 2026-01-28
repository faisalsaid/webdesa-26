"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function SettingsComp() {
  const tabItems = [
    { id: "profile", label: "Profil Pengguna" },
    { id: "account", label: "Akun & Keamanan" },
    { id: "notif", label: "Notifikasi" },
    { id: "billing", label: "Metode Pembayaran" },
    { id: "privacy", label: "Privasi Data" },
    { id: "integrations", label: "Integrasi App" },
    { id: "advanced", label: "Pengaturan Lanjut" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buka Pengaturan</Button>
      </DialogTrigger>

      <DialogContent className="min-w-56">
        <DialogHeader className="">
          <DialogTitle>Pengaturan Sistem</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full overflow-x-hidden">
          <div className="overflow-x-hidden w-full rounded-lg">
            <div className="overflow-x-scroll">
              <TabsList className="">
                {tabItems.map((items) => (
                  <TabsTrigger key={items.id} value={items.id}>
                    {items.label}
                  </TabsTrigger>
                ))}
                {/* <TabsTrigger value="1">Halo</TabsTrigger>
                  <TabsTrigger value="2">Jembatan Baru</TabsTrigger>
                  <TabsTrigger value="3">Jembatan Baru</TabsTrigger>
                  <TabsTrigger value="4">Jembatan Baru</TabsTrigger>
                  <TabsTrigger value="5">Jembatan Baru</TabsTrigger>
                  <TabsTrigger value="6">Jembatan Baru</TabsTrigger>
                  <TabsTrigger value="7">Jembatan Baru</TabsTrigger> */}
              </TabsList>
            </div>
          </div>

          <div className="">
            {tabItems.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <h4 className="text-sm font-medium mb-4">{tab.label}</h4>
                <p className="text-sm text-muted-foreground">
                  Ini adalah konten untuk bagian {tab.label}. Di sini kamu bisa
                  meletakkan form atau pengaturan lainnya.
                </p>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
