"use client";

import EmptyComp from "@/components/EmptyComp";
import { THamletsDataTable } from "../_config/dto/hamlet.type";
import HamletCard from "./HamletCard";
import { TableSearchForm } from "@/components/TableSearchForm";
import { TableResetButton } from "@/components/TableResetButton";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LimitSelector } from "@/components/LimitSelector";
import { TablePagination } from "@/components/TablePagination";

interface Props {
  data: THamletsDataTable | undefined;
  search?: string;
}

const HamletTableComp = ({ data, search: defaultSearch = "" }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`/village/hamlets?q=${encodeURIComponent(value)}&page=1`);
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/village/hamlets?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/village/hamlets");
    setSearchResetKey((prev) => prev + 1); // paksa re-render input
  };

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-72 border border-dashed rounded-2xl">
        Data tidak ditemukan
      </div>
    );

  const { meta, dataTable } = data;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center w-full ">
        <div className="flex-1">
          <TableSearchForm
            key={searchResetKey}
            defaultSearch={defaultSearch}
            onSearch={handleSearch}
            placeholder="e.g : Bukit Jalil..."
          />
        </div>
        <TableResetButton onReset={handleReset} />
      </div>
      <div>
        {dataTable.length === 0 ? (
          <EmptyComp text="Pencarian tidak sesuai dengan data dusun yang ada"></EmptyComp>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataTable.map((hamlet) => (
              <HamletCard key={hamlet.id} hamlet={hamlet} />
            ))}
          </div>
        )}
      </div>

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="/village/hamlets"
            defaultLimit={10}
            paramName="pageSize"
            options={[10, 20, 50, 100]}
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
    </div>
  );
};

export default HamletTableComp;
