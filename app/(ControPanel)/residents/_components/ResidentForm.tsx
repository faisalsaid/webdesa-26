"use client";

import { useForm } from "react-hook-form";
import { TResidentFormInput } from "../_config/dto/resident.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResidentInputSchema } from "../_config/dto/resident.zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bloodTypeOptions,
  citizenshipOptions,
  disabilityTypeOptions,
  educationOptions,
  genderOptions,
  maritalStatusOptions,
  occupationOptions,
  populationStatusOptions,
  relegionOptions,
} from "../_config/dto/resident.enum";
import { Button } from "@/components/ui/button";
import { Calendar, Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTransition } from "react";
import { createResident } from "../_config/actions/createResident.action";
import { toast } from "sonner";

interface Props {
  defaultValues?: TResidentFormInput;
}

const ResidentForm = ({ defaultValues }: Props) => {
  const isEdit = defaultValues;
  const [isPending, startTransition] = useTransition();

  const form = useForm<TResidentFormInput>({
    resolver: zodResolver(ResidentInputSchema),
    defaultValues: defaultValues || {
      nik: "",
      fullName: "",
      imageKey: "",
      imageUrl: "",
      gender: "MALE",
      birthPlace: "",
      birthDate: null,
      religion: "ISLAM",
      bloodType: "UNKNOWN",
      citizenship: "WNI",
      education: "NONE",
      occupation: "UNEMPLOYED",
      maritalStatus: "SINGLE",
      disabilityType: "NONE",
      address: "",
      dusun: "",
      rw: "",
      rt: "",
      populationStatus: "PERMANENT",
      isActive: true,
    },
  });

  const onSubmit = (value: TResidentFormInput) => {
    startTransition(async () => {
      if (isEdit) {
        try {
        } catch (error) {}
      } else {
        const res = await createResident(value);
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
      }
    });
  };
  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full overflow-hidden"
      >
        <fieldset disabled={isSubmitting} className="space-y-4 w-full">
          <Tabs defaultValue="identitiy" className="w-full  space-y-4">
            <TabsList className="">
              <TabsTrigger value="identitiy">Identitas</TabsTrigger>
              <TabsTrigger value="education">Karier</TabsTrigger>
              <TabsTrigger value="address">Alamat</TabsTrigger>
              <TabsTrigger value="info">Informasi</TabsTrigger>
            </TabsList>

            <TabsContent value="identitiy" className="">
              <ScrollArea className=" h-[55vh] md:h-full">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* NIK */}
                    <FormField
                      control={form.control}
                      name="nik"
                      render={({ field }) => (
                        <FormItem className="h-fit">
                          <FormLabel>
                            NIK : <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl className="bg-background">
                            <Input
                              className="text-sm appearance-none no-spin"
                              placeholder="e.g. 3273056010900009"
                              // {...field}
                              onChange={(e) => {
                                // Hapus semua karakter yang BUKAN digit (0-9)
                                const sanitizedValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                field.onChange(sanitizedValue);
                              }}
                              type="text"
                              maxLength={16}
                              value={field.value}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormDescription className="text-xs italic">
                            Pastikan NIK terdiri dari 16 angka
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Full name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="h-fit">
                          <FormLabel>
                            Nama Lengkap :{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl className="bg-background">
                            <Input
                              className="text-sm"
                              placeholder="e.g. Soekarno Hatta"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="min-h-56 flex items-center justify-center border border-dashed rounded-lg">
                      <p>Image Select</p>
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="h-fit">
                            <FormLabel>
                              Jenis Kelamin :{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full bg-background">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  {genderOptions.map((gender) => (
                                    <SelectItem
                                      key={gender.value}
                                      value={gender.value}
                                      className="w-full"
                                    >
                                      {gender.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Birth place */}

                      <FormField
                        control={form.control}
                        name="birthPlace"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tempat Lahir :</FormLabel>
                            <FormControl className="bg-background">
                              <Input
                                className="text-sm"
                                placeholder="e.g. Ambon"
                                {...field}
                                value={field.value ?? ""} // penting!
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Birth Date */}
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left"
                                  >
                                    {field.value
                                      ? field.value.toLocaleDateString()
                                      : "Pilih tanggal"}
                                    <Calendar className="ml-auto h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value ?? undefined}
                                    onSelect={(date) => field.onChange(date)}
                                    disabled={(date) => date > new Date()} // contoh: tidak bisa pilih tanggal di masa depan
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="religion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agama :</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value ?? undefined}
                            >
                              <SelectTrigger className="w-full bg-background">
                                <SelectValue placeholder="Pilih agama" />
                              </SelectTrigger>
                              <SelectContent>
                                {relegionOptions.map((religion) => (
                                  <SelectItem
                                    key={religion.value}
                                    value={religion.value}
                                  >
                                    {religion.label}
                                    {/* label bahasa Indonesia */}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Blood Type Field */}
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Golongan Darah :</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value ?? undefined} // ✅ hilangkan warning null
                            >
                              <SelectTrigger className="w-full bg-background">
                                <SelectValue placeholder="Pilih golongan darah" />
                              </SelectTrigger>
                              <SelectContent>
                                {bloodTypeOptions.map((blood) => (
                                  <SelectItem
                                    key={blood.value}
                                    value={blood.value}
                                  >
                                    {blood.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Citizenship Field */}
                    <FormField
                      control={form.control}
                      name="citizenship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kewarganegaraan :</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value ?? undefined} // ✅ hilangkan warning null
                            >
                              <SelectTrigger className="w-full bg-background">
                                <SelectValue placeholder="Pilih kewarganegaraan" />
                              </SelectTrigger>
                              <SelectContent>
                                {citizenshipOptions.map((citizenship) => (
                                  <SelectItem
                                    key={citizenship.value}
                                    value={citizenship.value}
                                  >
                                    {citizenship.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* EDUCATION TABS */}
            <TabsContent value="education">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {/* Education Field */}
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan :</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined} // ✅ hilangkan warning null
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Pilih pendidikan" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationOptions.map((education) => (
                              <SelectItem
                                key={education.value}
                                value={education.value}
                              >
                                {education.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Occupation Field */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan :</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined} // ✅ hilangkan warning null
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Pilih pekerjaan" />
                          </SelectTrigger>
                          <SelectContent>
                            {occupationOptions.map((occupation) => (
                              <SelectItem
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marital Status Field */}
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Perkawinan :</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined} // ✅ hilangkan warning null
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Pilih status perkawinan" />
                          </SelectTrigger>
                          <SelectContent>
                            {maritalStatusOptions.map((marital) => (
                              <SelectItem
                                key={marital.value}
                                value={marital.value}
                              >
                                {marital.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Disability Type Field */}
                <FormField
                  control={form.control}
                  name="disabilityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Disabilitas :</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined} // ✅ hilangkan warning null
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Pilih jenis disabilitas" />
                          </SelectTrigger>
                          <SelectContent>
                            {disabilityTypeOptions.map((disability) => (
                              <SelectItem
                                key={disability.value}
                                value={disability.value}
                              >
                                {disability.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="address" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="h-full md:flex flex-col">
                      <FormLabel className="h-fit">Alamat :</FormLabel>
                      <FormControl className="bg-background w-full h-32 resize-none">
                        <Textarea
                          placeholder="e.g : Jln. Merdeka Raya No.45"
                          {...field}
                          value={field.value ?? ""}
                          className="h-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dusun"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dusun : </FormLabel>
                        <FormControl className="bg-background">
                          <Input
                            placeholder="e.g : Lestari"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* RW */}
                  <FormField
                    control={form.control}
                    name="rw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RW :</FormLabel>
                        <FormControl className="bg-background">
                          <Input
                            placeholder="e.g : 001"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* RT */}
                  <FormField
                    control={form.control}
                    name="rt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RT :</FormLabel>
                        <FormControl className="bg-background">
                          <Input
                            placeholder="e.g : 001"
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

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon :</FormLabel>
                      <FormControl className="bg-background">
                        <Input
                          placeholder="e.g : 123456"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email :</FormLabel>
                      <FormControl className="bg-background">
                        <Input
                          placeholder="Masukkan email"
                          type="email"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Passport iD Field */}
                <FormField
                  control={form.control}
                  name="passportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No Paspor :</FormLabel>
                      <FormControl className="bg-background">
                        <Input
                          className="text-sm"
                          placeholder="e.g. C1234567A"
                          {...field}
                          value={field.value ?? ""} // penting!
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nationality */}
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kewarganegaraan / Negara :</FormLabel>
                      <FormControl className="bg-background">
                        <Input
                          placeholder="e.g : Indonesia"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ethnicity Field */}
                <FormField
                  control={form.control}
                  name="ethnicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suku / Etnis</FormLabel>
                      <FormControl className="bg-background">
                        <Input
                          placeholder="e.g : Ambon"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="populationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Kependudukan :</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined} // ✅ hilangkan warning null
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Pilih status kependudukan" />
                          </SelectTrigger>
                          <SelectContent>
                            {populationStatusOptions.map((population) => (
                              <SelectItem
                                key={population.value}
                                value={population.value}
                              >
                                {population.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <FormLabel className="mb-0">
                          {field.value
                            ? "Status: Aktif"
                            : "Status: Tidak Aktif"}
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </FormControl>
                      </div>
                      <FormDescription className="text-xs italic">
                        Menentukan apakah penduduk ini masih aktif terdaftar.
                        Jika non-aktif, berarti penduduk sudah pindah,
                        meninggal, atau tidak aktif di sistem.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
          <Separator />
          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting || isPending}
              className="text-rose-500"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="w-fit"
              disabled={isSubmitting || (isSubmitted && !isValid)}
            >
              <Upload />
              {form.formState.isSubmitting
                ? "Memproses..."
                : isEdit
                  ? "Ubah Data Warga"
                  : "Tambah Data Warga"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default ResidentForm;
