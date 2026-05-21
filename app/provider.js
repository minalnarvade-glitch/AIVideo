"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { supabase } from "@/lib/supabaseClient";

export const AuthContext = createContext();

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser) {
        setUser({
          id: supabaseUser.id, // ✅ IMPORTANT
          email: supabaseUser.email, // ✅ IMPORTANT
          imageUrl: supabaseUser.user_metadata?.avatar_url || "",
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id, // ✅ IMPORTANT
          email: session.user.email, // ✅ IMPORTANT
          imageUrl: session.user.user_metadata?.avatar_url || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

export default Provider;