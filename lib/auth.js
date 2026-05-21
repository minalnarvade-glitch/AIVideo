import { supabase } from "./supabaseClient";

// LOGIN
export const login = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// SIGNUP
export const signup = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

// LOGOUT
export const logout = async () => {
  return await supabase.auth.signOut();
};

// GET USER
export const getUser = async () => {
  return await supabase.auth.getUser();
};