import { supabase } from "./supabaseClient";

let currentUser = null;
let listeners = [];

export const authStore = {
  init() {
    supabase.auth.getSession().then(({ data }) => {
      currentUser = data.session?.user || null;
      notify();
    });

    supabase.auth.onAuthStateChange((event, session) => {
      currentUser = session?.user || null;
      notify();
    });
  },

  getUser() {
    return currentUser;
  },

  subscribe(callback) {
    listeners.push(callback);
    callback(currentUser);

    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  },
};

function notify() {
  listeners.forEach((cb) => cb(currentUser));
}