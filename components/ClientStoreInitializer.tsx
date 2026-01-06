"use client";

import { TCurentUser } from "@/lib/helper/getCurrentUsers";
import { useUserStore } from "@/store/curentUser.store";
import { useEffect, useRef } from "react";

interface Props {
  user: TCurentUser | null;
}
const ClientStoreInitializer = ({ user }: Props) => {
  const { setUser } = useUserStore();

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // 4. Masukkan data ke Zustand Store
      setUser(user);
      initialized.current = true;
      console.log(
        "Zustand store berhasil diinisialisasi dengan data pengguna."
      );
    }
  }, [user, setUser]);

  return null;
};

export default ClientStoreInitializer;
