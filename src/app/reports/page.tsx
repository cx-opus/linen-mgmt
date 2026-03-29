"use client";

import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Download,
  DollarSign,
  RotateCcw,
  AlertTriangle,
  PackageX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { monthlyConsumption } from "@/lib/mock-data";

function KPICard({
  title,
  value,
  unit,
  trend,
  trendValue,
  icon: Icon,
  color,
  iconClass,
}: {
  title: string;
  value: string;
  unit: string;
  trend: "up" | "down";
  trendValue: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconClass: string;
}) {
  return (
    <Card className="group transition-shadow hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{title}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div
            className="flex size-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className={`size-5 ${iconClass}`} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs">
          {trend === "up" ? (
            <TrendingUp className="size-3 text-green-600" />
          ) : (
            <TrendingDown className="size-3 text-red-600" />
          )}
          <span className={trend === "up" ? "text-green-600" : "text-red-600"}>
            {trendValue}
          </span>
          <span className="text-muted-foreground">较上月</span>
        </div>
      </CardContent>
    </Card>
  );
}

const tooltipStyle = {
  backgroundColor: "oklch(1 0 0)",
  border: "1px solid oklch(0.9 0 0)",
  borderRadius: "8px",
  color: "oklch(0.2 0 0)",
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-muted-foreground">数据统计周期: 2025-10 至 2026-03</h2>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Download className="size-3.5" />
          导出报表
        </Button>
      </div>

      {/* KPI 卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="库存周转率"
          value="2.43"
          unit="次/月"
          trend="up"
          trendValue="+0.15"
          icon={RotateCcw}
          color="#4f8ef7"
          iconClass="text-blue-600"
        />
        <KPICard
          title="布草破损率"
          value="1.26"
          unit="%"
          trend="down"
          trendValue="-0.18%"
          icon={AlertTriangle}
          color="#f97316"
          iconClass="text-orange-600"
        />
        <KPICard
          title="布草丢失率"
          value="0.04"
          unit="%"
          trend="down"
          trendValue="-0.01%"
          icon={PackageX}
          color="#ef4444"
          iconClass="text-red-600"
        />
        <KPICard
          title="月均成本"
          value="126,667"
          unit="元"
          trend="up"
          trendValue="+5.5%"
          icon={DollarSign}
          color="#34d399"
          iconClass="text-emerald-600"
        />
      </div>

      <Tabs defaultValue="consumption" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="consumption">消耗分析</TabsTrigger>
          <TabsTrigger value="cost">成本分析</TabsTrigger>
          <TabsTrigger value="wash">洗涤分析</TabsTrigger>
        </TabsList>

        {/* 消耗分析 */}
        <TabsContent value="consumption">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">月度采购 vs 报废</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyConsumption}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                      <XAxis dataKey="month" tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                      <YAxis tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend />
                      <Bar dataKey="purchase" name="采购入库" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="dispose" name="报废数量" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">月度洗涤量趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyConsumption}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                      <XAxis dataKey="month" tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                      <YAxis tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area
                        type="monotone"
                        dataKey="wash"
                        name="洗涤量"
                        stroke="#22d3ee"
                        fill="#22d3ee"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 成本分析 */}
        <TabsContent value="cost">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">月度成本趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyConsumption}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                    <XAxis dataKey="month" tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                    <YAxis tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value) => [`¥${Number(value).toLocaleString()}`, "成本"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      name="总成本"
                      stroke="#f97316"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#f97316" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 成本明细表 */}
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">月度成本明细</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-4 py-3 font-medium">月份</th>
                      <th className="px-4 py-3 font-medium">采购数量</th>
                      <th className="px-4 py-3 font-medium">报废数量</th>
                      <th className="px-4 py-3 font-medium">洗涤次数</th>
                      <th className="px-4 py-3 font-medium text-right">总成本</th>
                      <th className="px-4 py-3 font-medium text-right">环比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyConsumption.map((item, idx) => {
                      const prev = idx > 0 ? monthlyConsumption[idx - 1].cost : item.cost;
                      const change = ((item.cost - prev) / prev) * 100;
                      return (
                        <tr key={item.month} className={`border-b border-border/50 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}>
                          <td className="px-4 py-3 text-sm font-medium">{item.month}</td>
                          <td className="px-4 py-3 text-sm">{item.purchase.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{item.dispose}</td>
                          <td className="px-4 py-3 text-sm">{item.wash.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-sm font-medium">¥{item.cost.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-sm">
                            {idx === 0 ? (
                              <span className="text-muted-foreground">-</span>
                            ) : (
                              <span className={change >= 0 ? "text-red-600" : "text-green-600"}>
                                {change >= 0 ? "+" : ""}{change.toFixed(1)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 洗涤分析 */}
        <TabsContent value="wash">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">月度洗涤成本与数量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyConsumption}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                    <XAxis dataKey="month" tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                    <YAxis tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="wash" name="洗涤件数" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
