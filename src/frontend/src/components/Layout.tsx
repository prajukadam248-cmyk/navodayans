import { Outlet } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="layout"
    >
      {/* Main scrollable content — padded above bottom nav */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto pb-20"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <Outlet />
      </main>

      {/* Sticky bottom navigation */}
      <BottomNav />
    </div>
  );
}
