"use client";

import { useForm } from "react-hook-form";
import { StaffFormInput } from "../_config/dto/staffType.zod";
import {
  TStaffFormInput,
  TStaffPositionOptions,
} from "../_config/dto/staffType.type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Autocomplete } from "@/components/autocomplete";
import { useState } from "react";
import { searchResidentToStaff } from "../_config/dto/searchResidentToStaff.actions";
import { RefreshCcw, Send } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Calendar, Pencil, RefreshCwIcon, Undo2, Upload } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useStaffPositionOptionsStore } from "@/store/staffPostitionsOptions.store";
import { TStaffDataTable } from "../../_config/dto/staff.type";

interface Props {
  initialData?: TStaffDataTable;
  onSubmit: (value: TStaffFormInput) => void;
}

type ResidentItem = { id: number; fullName: string; nik: string };

const StaffForm = ({ initialData, onSubmit }: Props) => {
  //   console.log(positionOptions);

  const positionOptions = useStaffPositionOptionsStore(
    (s) => s.positionOptions,
  );

  const isEdit = !!initialData;
  const availableTypes = positionOptions
    ? positionOptions?.filter((t) => !(t.isUnique && t.isFilled))
    : null;

  const [selectedResident, setSelectedResident] = useState<ResidentItem | null>(
    null,
  );

  const form = useForm<TStaffFormInput>({
    resolver: zodResolver(StaffFormInput),
    defaultValues: initialData ?? {
      isActive: true,
      startDate: new Date(),
      endDate: null,
      name: "",
    },
  });

  // const watchResidentId = form.watch("residentId");
  const watchName = form.watch("name");
  const watchPositionTypeId = form.watch("positionTypeId");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4">
          {!isEdit && availableTypes ? (
            <FormField
              control={form.control}
              name="positionTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select
                    value={field.value ? field.value.toString() : undefined}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl className="bg-background w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableTypes.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id.toString()}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="p-2 border rounded-lg">
              <p className="text-muted-foreground">Jabatan </p>
              <p className="text-lg">{initialData?.positionType.name}</p>
            </div>
          )}

          {/* Nama pejabat */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pejabat</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g : John Doe, S.Sos"
                    {...field}
                    disabled={!watchPositionTypeId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residentId"
            render={({ field }) => (
              <Autocomplete<ResidentItem>
                disabled={!watchPositionTypeId}
                label="Resident"
                placeholder={
                  !watchPositionTypeId
                    ? "Pilih jabatan terlebih dahulu"
                    : "Cari resident..."
                }
                // bentuk data di form = id number
                value={selectedResident} // tidak dipakai karena kita simpan id
                onChange={(resident) => {
                  setSelectedResident(resident || null);
                  field.onChange(resident?.id ?? null);
                }}
                search={async (q) => {
                  return await searchResidentToStaff(q);
                }}
                displayValue={(item) =>
                  item ? `${item.fullName} – ${item.nik}` : ""
                }
                getKey={(item) => item.id}
              />
            )}
          />

          <div className="flex gap-2 items-center w-full">
            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tanggal Mulai</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full  justify-start text-left"
                          disabled={!watchName}
                        >
                          {field.value
                            ? field.value.toLocaleDateString("id-ID")
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
                          startMonth={new Date(1950, 0)} // Januari 1950
                          endMonth={new Date(new Date().getFullYear(), 11)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tanggal Berakhir</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                          disabled={!watchName}
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
                          disabled={(date) => date < today}
                          captionLayout="dropdown"
                          startMonth={new Date(1950, 0)}
                          endMonth={new Date(new Date().getFullYear() + 10, 11)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Status Aktif</FormLabel>
                  <FormDescription>
                    <span className="text-xs text-muted-foreground">
                      Tentukan apakah staff ini sedang aktif atau tidak.
                    </span>
                  </FormDescription>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-green-500"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 border-t pt-6">
            <Button
              className="text-rose-600"
              variant="outline"
              type="button"
              onClick={() => form.reset()}
            >
              <RefreshCcw />
              <span>Reset</span>
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting || (isSubmitted && !isValid)}
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitting ? <Spinner /> : <Send />}
              <span>
                {isSubmitting
                  ? "Proccessing..."
                  : isEdit
                    ? "Update Room Type"
                    : "Save Room Type"}
              </span>
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default StaffForm;
