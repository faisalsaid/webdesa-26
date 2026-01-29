"use client";

import EmptyComp from "@/components/EmptyComp";
import {
  TResident,
  TResidentFormInput,
  TResidentsDataTableResult,
} from "../_config/dto/resident.type";
import { User2 } from "lucide-react";
import { ResidentCard } from "./ResidentCard";
import { TableSearchForm } from "@/components/TableSearchForm";
import { TableResetButton } from "@/components/TableResetButton";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LimitSelector } from "@/components/LimitSelector";
import { TablePagination } from "@/components/TablePagination";
import { getResidentById } from "../_config/actions/getResidentById.action";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import ResidentForm from "./ResidentForm";
import { updateResidentByID } from "../_config/actions/updateResidentById.actions";

interface Props {
  residentDataTable: TResidentsDataTableResult;
  search?: string;
}

const AllResidentsComp = ({
  residentDataTable,
  search: defaultSearch = "",
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResetKey, setSearchResetKey] = useState(0);
  const { meta, dataTable } = residentDataTable;
  const [isPending, startTransition] = useTransition();
  const [resident, setResident] = useState<TResident | undefined>(undefined);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    router.push(`/residents?q=${encodeURIComponent(value)}&page=1`);
  };

  const handleReset = () => {
    router.push("/residents");
    setSearchResetKey((prev) => prev + 1); // paksa re-render input
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/residents?${params.toString()}`);
  };

  const updateTriger = (urlId: string) => {
    startTransition(async () => {
      const res = await getResidentById(urlId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setResident(res.resident);
      setUpdateDialog(true);
    });
  };

  const handleUpdate = (payload: TResidentFormInput) => {
    startTransition(async () => {
      const res = await updateResidentByID(payload);
      if (!res.success) {
        toast.error(res.message ? res.message : "Gagal perbarui data penduduk");
        return;
      }

      toast.success(
        res.message ? res.message : "Berhasil perbarui data penduduk",
      );
      setUpdateDialog(false);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center w-full ">
        <div className="flex-1">
          <TableSearchForm
            key={searchResetKey}
            defaultSearch={defaultSearch}
            onSearch={handleSearch}
            placeholder="Cari Nama / NIK ..."
          />
        </div>
        <TableResetButton onReset={handleReset} />
      </div>
      <div>
        {dataTable.length === 0 ? (
          <EmptyComp
            icon={User2}
            desctiption="Data tidak ditemukan"
            text="Pastikan kata kunci pencarian sudah sesuai"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {residentDataTable.dataTable.map((resident) => (
              <ResidentCard
                key={resident.id}
                resident={resident}
                onUpdate={updateTriger}
              />
            ))}
          </div>
        )}
      </div>

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="/residents"
            defaultLimit={10}
            paramName="pageSize"
            options={[5, 10, 20, 50, 100]}
          />
        </div>
        {/* Pagination */}
        <div className="sm:flex-1">
          <TablePagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
      </div>

      {/* DILAOG */}

      <div>
        <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
          <DialogContent className="md:min-w-[50%]">
            <DialogHeader>
              <DialogTitle>Perbarui Data Penduduk</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Separator />
            <ResidentForm defaultValues={resident} updated={handleUpdate} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AllResidentsComp;
