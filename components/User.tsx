"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import db, { UserData } from "../app/store/db";
import { useGetDexieDB, useSetDexieDB } from "@/utils/useDexieDB";
import { Session } from "next-auth";
import { getDexieUser, setDexieUser } from "@/utils/dexieUtils";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

const User: React.FC = () => {
  const router = useRouter();
  const [user, setLocalUser] = useState<UserData | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setDexieUser({
        id: "1", //Removed session.user?.id (for default dexie user)
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
      }).then((data) => {
        console.log("set user from server");
        getDexieUser("1").then((data) => {
          setLocalUser(data);
        });
      });
    }else{
      getDexieUser("1").then((data) => {
        console.log("set user from indexed");
        setLocalUser(data);
      });
    }
  }, [session, user?.name]);

  return (
    <div>
      {user?.image &&
      <>
      <Image src={user?.image||""} alt="logo" width={100} height={100} />
      <div className="user">{user?.name}</div>
      <a href="/api/auth/signout">Sign out</a>
      </>
      }
    </div>
  );
};

export default User;
