"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MapPin,
  Hash,
  Phone,
  Mail,
  Globe,
  Calendar,
  FileText,
  Compass,
  Ruler,
  Save,
  Loader2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { TVillageInput } from "../_config/dto/villageForm.type";
import { villageConfigSchema } from "../_config/dto/village.zod";
import { toast } from "sonner";
import { addVillageData } from "../_config/actions/addVillageData.action";
import { updateVillageProfile } from "../_config/actions/updateVillageData.action";
import { useRouter } from "next/navigation";

interface Props {
  devaultData?: TVillageInput;
}

const VillageFormComp = ({ devaultData }: Props) => {
  const router = useRouter();

  const isEdit = !!devaultData;

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(villageConfigSchema),
    defaultValues: devaultData ? devaultData : {},
  });

  const onSubmit = (value: TVillageInput) => {
    // console.log(value);

    startTransition(async () => {
      try {
        if (isEdit) {
          const res = await updateVillageProfile(value);
          if (!res.success) {
            toast.error("Profil desa gagal diperbarui!");
            return;
          }
          toast.success(res.message);
          router.push("/village");
        } else {
          const res = await addVillageData(value);
          if (!res.success) {
            toast.error("Profil desa gagal dibuat!");
            return;
          }
          toast.success(res.message);
          router.push("/village");
        }
      } catch (error: unknown) {
        toast.error("Ups!, terjadi kesalahan!");
      }
    });
  };

  const { isSubmitting, isValid } = form.formState;
  const isSaving = isSubmitting || isPending;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <div className="overflow-x-auto pb-2 no-scrollbar mb-6">
            <TabsList className="bg-zinc-100 dark:bg-zinc-800 p-1 w-full sm:w-auto flex justify-start">
              <TabsTrigger
                className="flex-1 sm:flex-none px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all"
                value="general"
              >
                <Building2 className="w-4 h-4 mr-2" /> Umum
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 sm:flex-none px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all"
                value="identity"
              >
                <FileText className="w-4 h-4 mr-2" /> Identitas
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 sm:flex-none px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all"
                value="geo"
              >
                <MapPin className="w-4 h-4 mr-2" /> Geografis
              </TabsTrigger>
            </TabsList>
          </div>

          {/* --- TAB UMUM --- */}
          <TabsContent
            value="general"
            className="space-y-6 animate-in fade-in slide-in-from-bottom-2"
          >
            {/* Section: Identitas Dasar */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center">
                <Hash className="w-4 h-4 mr-2" /> Data Dasar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="villageCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Desa</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 7300..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="villageName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Desa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Desa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="establishedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Berdiri</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                          <Input
                            type="number"
                            className="pl-9"
                            placeholder="YYYY"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value),
                              )
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Section: Hirarki Wilayah */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center">
                <Building2 className="w-4 h-4 mr-2" /> Administrasi Wilayah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Kecamatan */}
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="districtCode"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Kode Kec.</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Kode"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="districtName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Nama Kecamatan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Kecamatan"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Kabupaten */}
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="regencyCode"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Kode Kab.</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Kode"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regencyName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Nama Kabupaten</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Kabupaten"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Provinsi */}
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="provinceCode"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Kode Prov.</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Kode"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="provinceName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Nama Provinsi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Provinsi"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Section: Kontak */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center">
                <Phone className="w-4 h-4 mr-2" /> Kontak & Alamat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="officeAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Alamat Kantor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jln. Raya..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="xxxxx"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telepon</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                          <Input
                            className="pl-9"
                            placeholder="(0xxx) xxxxxx"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                          <Input
                            className="pl-9"
                            placeholder="desa@mail.com"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                          <Input
                            className="pl-9"
                            placeholder="https://www.desa.id"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          {/* --- TAB IDENTITAS --- */}
          <TabsContent
            value="identity"
            className="space-y-6 animate-in fade-in slide-in-from-bottom-2"
          >
            <FormField
              control={form.control}
              name="slogan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slogan Desa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Moto atau Semboyan Desa"
                      className="font-medium"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Visi desa..."
                        className="min-h-37.5 resize-none"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Misi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Misi desa..."
                        className="min-h-37.5 resize-none"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Singkat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Gambaran umum tentang desa..."
                      className="min-h-25"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* --- TAB GEOGRAFIS --- */}
          <TabsContent
            value="geo"
            className="space-y-6 animate-in fade-in slide-in-from-bottom-2"
          >
            {/* Statistik */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase flex items-center">
                <Ruler className="w-4 h-4 mr-2" /> Statistik & Ukuran
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="areaSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Luas</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="populationTotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penduduk</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="elevation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MDPL</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hamletCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dusun</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <FormField
                  control={form.control}
                  name="rwCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah RW</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rtCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah RT</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Batas Wilayah */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase flex items-center">
                <Compass className="w-4 h-4 mr-2" /> Batas Wilayah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="borderNorth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batas Utara</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Desa ..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="borderEast"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batas Timur</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Desa ..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="borderSouth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batas Selatan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Desa ..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="borderWest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batas Barat</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Desa ..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Koordinat */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Koordinat Peta
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-7.xxxx"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="110.xxxx"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6 border-t">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 min-w-[140px]"
            disabled={isSaving || !isValid}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VillageFormComp;
