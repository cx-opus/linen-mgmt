"use client";

import { Bell, Search, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "仪表盘",
  "/inventory": "库存管理",
  "/tracking": "布草追踪",
  "/laundry": "洗涤管理",
  "/disposal": "报废管理",
  "/procurement": "采购管理",
  "/reports": "数据报表",
  "/settings": "系统设置",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  for (const [key, value] of Object.entries(pageTitles)) {
    if (key !== "/" && pathname.startsWith(key)) return value;
  }
  return "布草管理系统";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold pl-10 lg:pl-0">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* 搜索 */}
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground md:flex">
          <Search className="size-4" />
          <span>搜索...</span>
          <kbd className="ml-4 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </div>

        {/* 通知 */}
        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Bell className="size-[18px]" />
          <Badge className="absolute -right-0.5 -top-0.5 size-4 items-center justify-center rounded-full p-0 text-[10px]">
            3
          </Badge>
        </button>

        {/* 用户 */}
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-accent">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium">管理员</span>
            <span className="text-[10px] text-muted-foreground">admin@hotel.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
