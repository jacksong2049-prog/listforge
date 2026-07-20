"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button variant="primary" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  const user = session.user;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
        ) : (
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs">
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl animate-scale-in z-50">
          <div className="p-3 border-b border-slate-100">
            <p className="font-medium text-sm text-slate-800 truncate">
              {user.name || "User"}
            </p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>

          <div className="p-1.5">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Upgrade Plan
            </Link>
          </div>

          <div className="p-1.5 border-t border-slate-100">
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
