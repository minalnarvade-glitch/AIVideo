"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

function Header() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // GET USER
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      setLoading(false);
    });

    // AUTH LISTENER
    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="p-4 shadow-md flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <Image
          src="/logo1.svg"
          alt="logo"
          width={40}
          height={40}
        />

        <h2 className="text-2xl font-bold">
          VidFlow AI
        </h2>

      </div>

      {/* RIGHT */}
      <div>

        {loading ? (

          <Button disabled>
            Loading...
          </Button>

        ) : user ? (

          <div className="flex items-center gap-4">

            {/* CREATE VIDEO */}
            <Link href="/create-new-video">
              <Button>
                Create Video
              </Button>
            </Link>

            {/* PROFILE */}
            <Image
              src={
                user?.user_metadata?.avatar_url ||
                "/user.png"
              }
              alt="profile"
              width={40}
              height={40}
              className="rounded-full border"
            />

            {/* LOGOUT */}
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>

        ) : (

          <Link href="/login">
            <Button>
              Get Started
            </Button>
          </Link>

        )}

      </div>

    </div>
  );
}

export default Header;