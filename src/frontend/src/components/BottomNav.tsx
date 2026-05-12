import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Home, Settings, Sparkles, TrendingUp } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home, ocid: "nav.home" },
  {
    label: "Subjects",
    path: "/subjects",
    icon: BookOpen,
    ocid: "nav.subjects",
  },
  {
    label: "Chat",
    path: "/tutor",
    icon: Sparkles,
    ocid: "nav.tutor",
    featured: true,
  },
  {
    label: "Progress",
    path: "/progress",
    icon: TrendingUp,
    ocid: "nav.progress",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    ocid: "nav.settings",
  },
] as const;

const SUBJECT_COLORS = [
  "oklch(0.65 0.22 35)", // math orange
  "oklch(0.62 0.18 125)", // science green
  "oklch(0.68 0.2 270)", // social purple
  "oklch(0.65 0.2 230)", // english blue
  "oklch(0.62 0.18 10)", // hindi pink
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      data-ocid="bottom_nav"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-pb"
      style={{ boxShadow: "0 -4px 16px oklch(0 0 0 / 0.08)" }}
    >
      <div className="flex items-end justify-around h-16 px-2 max-w-lg mx-auto">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const activeColor = SUBJECT_COLORS[idx % SUBJECT_COLORS.length];

          if ("featured" in item && item.featured) {
            return (
              <Link
                key={item.path}
                to={item.path}
                data-ocid={item.ocid}
                className="flex flex-col items-center -mt-5"
              >
                <span
                  className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-smooth"
                  style={{
                    background: isActive
                      ? "oklch(0.65 0.22 35)"
                      : "linear-gradient(135deg, oklch(0.65 0.22 35), oklch(0.68 0.2 270))",
                    boxShadow: "0 4px 14px oklch(0.65 0.22 35 / 0.5)",
                  }}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                </span>
                <span
                  className="text-[10px] font-bold mt-1"
                  style={{
                    color: isActive ? activeColor : "oklch(0.55 0.015 280)",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              data-ocid={item.ocid}
              className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition-smooth"
            >
              <span
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-xl transition-smooth",
                  isActive && "scale-110",
                )}
                style={{
                  background: isActive ? `${activeColor}22` : "transparent",
                }}
              >
                <Icon
                  className="w-5 h-5 transition-smooth"
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{
                    color: isActive ? activeColor : "oklch(0.6 0.015 280)",
                  }}
                />
              </span>
              <span
                className="text-[10px] font-bold transition-smooth"
                style={{
                  color: isActive ? activeColor : "oklch(0.6 0.015 280)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
