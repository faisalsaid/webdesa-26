"use client";

import ErrorComp from "@/components/ErrorComp";
import { TStaffDataTableResult } from "../_config/dto/staff.type";
import StaffTableComp from "./table/StaffTableComp";
import { TableSearchForm } from "@/components/TableSearchForm";
import { TableResetButton } from "@/components/TableResetButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LimitSelector } from "@/components/LimitSelector";
import { TablePagination } from "@/components/TablePagination";

interface Props {
  data: TStaffDataTableResult | undefined;
  search?: string;
}

const AllStaffComp = ({ data, search: defaultSearch = "" }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`/organitations?q=${encodeURIComponent(value)}&page=1`);
  };

  const handleReset = () => {
    router.push("/organitations");
    setSearchResetKey((prev) => prev + 1); // paksa re-render input
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/organitations?${params.toString()}`);
  };
  if (!data) {
    return <ErrorComp />;
  }
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
      <StaffTableComp dataTable={data.dataTable} />
      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="/organitations"
            defaultLimit={10}
            paramName="pageSize"
            options={[10, 20, 50, 100]}
          />
        </div>
        {/* Pagination */}
        <div className="sm:flex-1">
          <TablePagination
            currentPage={data.meta.page}
            totalPages={data.meta.totalPages}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllStaffComp;
