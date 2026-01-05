"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { UserRole } from "@/app/generated/prisma/enums";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  updateUserRole,
  UpdateUserRoleInput,
} from "../../_config/actions/updateUserRole.action";
import getCurentUser, { TCurentUser } from "@/lib/helper/getCurrentUsers";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  user: {
    id: string;
    role: string;
    name: string | null;
  };

  // currentUser?: {
  //   id: string;
  //   name: string | null | undefined;
  //   email: string | null | undefined;
  //   role: string;
  // } | null;
};

const roles: UserRole[] = ["ADMIN", "OPERATOR", "EDITOR", "USER"];

const UserRolesCells = ({ user }: Props) => {
  const [currentUser, setCurrentUser] = useState<TCurentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);

  const filterRole =
    currentUser?.role === "OPERATOR"
      ? roles.filter((role) => role !== "ADMIN" && role !== "OPERATOR")
      : roles;

  const permission =
    currentUser?.role === "ADMIN" || currentUser?.role === "OPERATOR";

  const isDialogOpen = !!pendingRole;

  const handleChangeRole = async ({ userId, role }: UpdateUserRoleInput) => {
    const toastId = toast.loading("Updating role...");
    try {
      await updateUserRole({ userId, role });
      toast.success(`User role updated to ${role}`, { id: toastId });
      setSelectedRole(role); // Final update
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role", { id: toastId });
      // rollback
      // setSelectedRole(user.role);
    }
  };

  // console.log(pendingRole);

  const canEdit = () => {
    if (!permission) return false;
    if (currentUser?.role === "OPERATOR") {
      return user.role !== "ADMIN" && user.role !== "OPERATOR";
    }
    return true; // Admin bebas
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurentUser();
        if (data) {
          setCurrentUser(data);
        } else {
        }
      } catch (error) {
        console.error("Gagal mengambil user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex  items-center">
      {/* <p>{user.role}</p> */}
      {/* <p className="capitalize">{user.role.toLocaleLowerCase()}</p> */}

      <RoleBadge role={selectedRole} />
      {canEdit() && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Pencil />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="space-y-2 p-2">
                <Label>Change Role</Label>
                <Select
                  value={selectedRole}
                  onValueChange={(newRole: UserRole) => {
                    if (newRole !== selectedRole) setPendingRole(newRole);
                  }}
                >
                  <SelectTrigger className="w-30">
                    <SelectValue placeholder={selectedRole} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      {filterRole.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* confirm role changes */}
          {pendingRole && (
            <ConfirmDialog
              open={isDialogOpen} // Dialog terbuka jika pendingRole ada isinya
              onOpenChange={(open) => {
                if (!open) setPendingRole(null); // Jika ditutup (cancel/klik luar), hapus pendingRole
              }}
              title="Confirm Role Change"
              description={
                <span>
                  Are you sure you want to change{" "}
                  <span className="font-semibold uppercase">{user.name}</span>
                  {"'s role to "}
                  <span className="font-semibold uppercase">{pendingRole}</span>
                  ?
                </span>
              }
              confirmLabel="Yes, Change"
              cancelLabel="Cancel"
              onConfirm={() => {
                handleChangeRole({ userId: user.id, role: pendingRole });
                setPendingRole(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserRolesCells;

const roleStyles: Record<UserRole, string> = {
  ADMIN: "bg-green-500/10 border-green-500 text-green-700",
  OPERATOR: "bg-blue-500/10 border-blue-500 text-blue-700",
  EDITOR: "bg-yellow-500/10 border-yellow-500 text-yellow-700",
  USER: "bg-slate-500/10 border-slate-500 text-slate-700",
};
const RoleBadge = ({ role }: { role: string }) => {
  const style =
    roleStyles[role as UserRole] || "bg-gray-100 border-gray-300 text-gray-600";

  return (
    <Badge className={cn("border px-2 py-0.5 font-medium", style)}>
      {role}
    </Badge>
  );
};
