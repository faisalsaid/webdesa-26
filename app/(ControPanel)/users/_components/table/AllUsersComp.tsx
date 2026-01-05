"use client";

import { LimitSelector } from "@/components/LimitSelector";
import { TUser } from "../../_config/dto/user.type";
import { UserDataTable } from "./UserDataTable";
import { userColumns } from "./UsersColumns";
import { TablePagination } from "@/components/TablePagination";
import { useRouter, useSearchParams } from "next/navigation";
import { TableSearchForm } from "@/components/TableSearchForm";
import { TableResetButton } from "@/components/TableResetButton";
import { useState } from "react";

interface Props {
  data: TUser[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
  search?: string;
}

const AllUsersComp = ({ data, meta, search: defaultSearch = "" }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`users?q=${encodeURIComponent(value)}&page=1`);
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`users?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("users");
    setSearchResetKey((prev) => prev + 1); // paksa re-render input
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center w-full ">
        <div className="flex-1">
          <TableSearchForm
            key={searchResetKey}
            defaultSearch={defaultSearch}
            onSearch={handleSearch}
            placeholder="e.g : Pembangunan jalan..."
          />
        </div>
        <TableResetButton onReset={handleReset} />
      </div>
      <UserDataTable data={data} columns={userColumns} />

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="users"
            defaultLimit={10}
            paramName="pageSize"
            options={[10, 20, 50, 100]}
          />
        </div>
        {/* Pagination */}
        <div className="sm:flex-1">
          <TablePagination
            currentPage={meta.page}
            totalPages={meta.totalPage}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllUsersComp;
