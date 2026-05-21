"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import VideoList from './_components/VideoList'
export default function DashboardPage() {

  const router = useRouter();

  useEffect(() => {

    const checkUser = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // if no user -> back to login
      if (!session) {
        router.push("/login");
      }

      // CLEAN URL
      window.history.replaceState(
        {},
        document.title,
        "/dashboard"
      );
    };

    checkUser();

  }, []);

  return (
     <div>
            <h2 className='font-bold text-3xl'>My Videos</h2>
            <VideoList/>
        </div>
  );
}