"use client";

import {
  Package,
  PackageCheck,
  Droplets,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Trash2,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  dashboardStats,
  alerts,
  inventoryTrend,
  categoryDistribution,
  floorConsumption,
  operationLogs,
} from "@/lib/mock-data";

function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  color,
  iconClass,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: "up" | "down";
  color: string;
  iconClass: string;
}) {
  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{typeof value === "number" ? value.toLocaleString() : value}</p>
            {change && (
              <div className="flex items-center gap-1 text-xs">
                {changeType === "up" ? (
                  <ArrowUpRight className="size-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="size-3 text-red-600" />
                )}
                <span className={changeType === "up" ? "text-green-600" : "text-red-600"}>
                  {change}
                </span>
                <span className="text-muted-foreground">较昨日</span>
              </div>
            )}
          </div>
          <div
            className="flex size-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className={`size-5 ${iconClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertBadge({ level }: { level: string }) {
  if (level === "danger")
    return <Badge variant="destructive" className="text-[10px] px-1.5">紧急</Badge>;
  if (level === "warning")
    return <Badge className="bg-amber-100 text-amber-600 hover:bg-amber-200 text-[10px] px-1.5">预警</Badge>;
  return <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 text-[10px] px-1.5">正常</Badge>;
}

const actionColors: Record<string, string> = {
  "领用出库": "text-blue-600",
  "送洗登记": "text-cyan-600",
  "质检完成": "text-emerald-600",
  "入库登记": "text-green-600",
  "报废申请": "text-red-600",
  "归还入库": "text-violet-600",
  "RFID盘点": "text-amber-600",
  "洗后入库": "text-teal-600",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="总库存量"
          value={dashboardStats.totalInventory}
          icon={Package}
          change="+2.3%"
          changeType="up"
          color="#4f8ef7"
          iconClass="text-blue-600"
        />
        <StatCard
          title="在用数量"
          value={dashboardStats.inUse}
          icon={PackageCheck}
          change="+1.8%"
          changeType="up"
          color="#34d399"
          iconClass="text-emerald-600"
        />
        <StatCard
          title="清洗中"
          value={dashboardStats.inWash}
          icon={Droplets}
          change="-3.2%"
          changeType="down"
          color="#22d3ee"
          iconClass="text-cyan-600"
        />
        <StatCard
          title="报损数量"
          value={dashboardStats.damaged}
          icon={AlertTriangle}
          change="+5.1%"
          changeType="up"
          color="#f97316"
          iconClass="text-orange-600"
        />
      </div>

      {/* 今日动态 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100">
              <ArrowUpRight className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">今日领用</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardStats.todayDispatch}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100">
              <RotateCcw className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">今日归还</p>
              <p className="text-2xl font-bold text-emerald-600">{dashboardStats.todayReturn}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-100">
              <Trash2 className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">今日报废</p>
              <p className="text-2xl font-bold text-red-600">{dashboardStats.todayDisposal}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* 库存趋势 */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">库存趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inventoryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.92 0 0)" }}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.92 0 0)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0 0)",
                      borderRadius: "8px",
                      color: "oklch(0.2 0 0)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="总库存"
                    stroke="#4f8ef7"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#4f8ef7" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inUse"
                    name="在用"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#34d399" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inWash"
                    name="清洗中"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#22d3ee" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 品类分布 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">品类库存分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0 0)",
                      borderRadius: "8px",
                      color: "oklch(0.2 0 0)",
                    }}
                    formatter={(value) => [Number(value).toLocaleString() + " 件", "数量"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {categoryDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="ml-auto font-medium">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 楼层消耗 + 预警 */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">楼层消耗对比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={floorConsumption} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis
                    dataKey="floor"
                    tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.92 0 0)" }}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.92 0 0)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0 0)",
                      borderRadius: "8px",
                      color: "oklch(0.2 0 0)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="consumption" name="领用" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="return" name="归还" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">库存预警</CardTitle>
              <Badge variant="outline" className="text-[10px]">
                {alerts.filter((a) => a.level !== "normal").length} 项预警
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/30"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{alert.category}</span>
                      <AlertBadge level={alert.level} />
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>库存 {alert.current}</span>
                      <span>/</span>
                      <span>阈值 {alert.threshold}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (alert.current / alert.threshold) * 100)}%`,
                          backgroundColor:
                            alert.level === "danger"
                              ? "#ef4444"
                              : alert.level === "warning"
                                ? "#f59e0b"
                                : "#22c55e",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近操作日志 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">最近操作</CardTitle>
            <span className="text-xs text-muted-foreground">今日 {operationLogs.length} 条记录</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {operationLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/30"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Clock className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-sm font-medium">{log.operator}</span>
                    <span className={`text-sm font-medium ${actionColors[log.action] || "text-foreground"}`}>
                      {log.action}
                    </span>
                    <span className="text-sm text-muted-foreground">{log.target}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">{log.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {log.time.split(" ")[1]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
