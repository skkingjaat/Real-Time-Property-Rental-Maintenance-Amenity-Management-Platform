// File: src/app/dashboard/layout.tsx

"use client";

import { ReactNode, useState } from "react";

import { Header } from "@/components/dashboard/header";
import { MobileNavigation } from "@/components/dashboard/mobile-navigation";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileNavigationOpen, setMobileNavigationOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            onMenuClick={() => setMobileNavigationOpen(true)}
          />

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      <MobileNavigation
        open={mobileNavigationOpen}
        onClose={() => setMobileNavigationOpen(false)}
      />
    </div>
  );
}