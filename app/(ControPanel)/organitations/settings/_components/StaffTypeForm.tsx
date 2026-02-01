"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StaffPositionFormInput } from "../_config/dto/staffType.zod";
import { TStaffTypeFormInput } from "../_config/dto/staffType.type";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { staffLevelOptions } from "../_config/dto/staffTtype.enum";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface Props {
  initialData?: TStaffTypeFormInput;
  getSubmit?: (payload: TStaffTypeFormInput) => void;
  onSetModal?: (open: boolean) => void;
}

const StaffTypeForm = ({ initialData, getSubmit }: Props) => {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(StaffPositionFormInput),
    defaultValues: initialData || {
      name: "",
      description: "",
      positionType: "OTHER",
      isUnique: false,
    },
  });

  const onSubmit = (value: TStaffTypeFormInput) => {
    if (getSubmit) {
      getSubmit(value);
    }
  };

  const nameValue = form.watch("name");
  const nameState = form.getFieldState("name");
  const isNameInvalid = !nameValue || nameState.invalid;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Posisi</FormLabel>
              <FormControl className="bg-background">
                <Input {...field} placeholder="e.g : Kepala Desa" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="positionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Posisi</FormLabel>
              <FormControl className="bg-background">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tipe posisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffLevelOptions.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
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
          name="isUnique"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <FormLabel
                    className={`${
                      isNameInvalid ? "text-muted-foreground" : ""
                    }`}
                  >
                    Jabatan Tunggal
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500 hover:cursor-pointer"
                      disabled={isNameInvalid}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  <span className="text-xs text-muted-foreground">
                    Aktifkan jika jabatan ini hanya boleh dipegang oleh satu
                    orang pada satu waktu.
                  </span>
                </FormDescription>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl className="bg-background">
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="e.g : Bertanggung jawab semua ursan terkait desa"
                  className="h-28 resize-none"
                  disabled={isNameInvalid}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => form.reset()}
            className="text-red-500"
          >
            Reset
          </Button>

          <Button type="submit">
            <Upload />
            {isUpdate ? "Ubah" : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StaffTypeForm;
