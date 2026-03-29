"use client";

import {
  Droplets,
  Thermometer,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Truck,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
  ComposedChart,
} from "recharts";
import {
  laundryBatches,
  qualityRecords,
  laundryStats,
  laundryTrend,
} from "@/lib/mock-data";

const batchStatusConfig: Record<string, { color: string; bg: string }> = {
  "送洗中": { color: "text-cyan-600", bg: "bg-cyan-100" },
  "已清洗": { color: "text-blue-600", bg: "bg-blue-100" },
  "质检中": { color: "text-amber-600", bg: "bg-amber-100" },
  "已入库": { color: "text-emerald-600", bg: "bg-emerald-100" },
};

const gradeConfig: Record<string, { color: string; bg: string }> = {
  A: { color: "text-emerald-600", bg: "bg-emerald-100" },
  B: { color: "text-blue-600", bg: "bg-blue-100" },
  C: { color: "text-amber-600", bg: "bg-amber-100" },
  D: { color: "text-red-600", bg: "bg-red-100" },
};

export default function LaundryPage() {
  return (
    <Tabs defaultValue="batches" className="space-y-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="batches">送洗批次</TabsTrigger>
        <TabsTrigger value="quality">洗后质检</TabsTrigger>
        <TabsTrigger value="stats">洗涤统计</TabsTrigger>
      </TabsList>

      {/* 送洗批次 */}
      <TabsContent value="batches" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="outline" className="gap-1">
              <Truck className="size-3" />
              送洗中: {laundryBatches.filter((b) => b.status === "送洗中").length}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <ClipboardCheck className="size-3" />
              质检中: {laundryBatches.filter((b) => b.status === "质检中").length}
            </Badge>
          </div>
          <Button size="sm" className="gap-1.5">
            <Droplets className="size-3.5" />
            新建送洗
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>批次号</TableHead>
                  <TableHead>送洗日期</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>洗涤商</TableHead>
                  <TableHead>温度</TableHead>
                  <TableHead>时长</TableHead>
                  <TableHead>洗涤剂</TableHead>
                  <TableHead>归还日期</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laundryBatches.map((batch, idx) => {
                  const statusConf = batchStatusConfig[batch.status];
                  return (
                    <TableRow key={batch.id} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                      <TableCell className="font-mono text-xs font-medium">{batch.batchNo}</TableCell>
                      <TableCell className="text-xs">{batch.sendDate}</TableCell>
                      <TableCell>
                        <span className="font-medium">{batch.count}</span>
                        <span className="text-muted-foreground"> 件</span>
                      </TableCell>
                      <TableCell>{batch.supplier}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs">
                          <Thermometer className="size-3 text-orange-600" />
                          {batch.temperature}°C
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="size-3 text-muted-foreground" />
                          {batch.duration}分钟
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{batch.detergent}</TableCell>
                      <TableCell className="text-xs">{batch.returnDate || "-"}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConf.bg} ${statusConf.color} text-[10px]`}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 洗后质检 */}
      <TabsContent value="quality" className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>批次号</TableHead>
                  <TableHead>质检日期</TableHead>
                  <TableHead>质检员</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>总数/合格数</TableHead>
                  <TableHead>合格率</TableHead>
                  <TableHead>问题描述</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualityRecords.map((record, idx) => {
                  const grade = gradeConfig[record.grade];
                  return (
                    <TableRow key={record.id} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                      <TableCell className="font-mono text-xs font-medium">{record.batchNo}</TableCell>
                      <TableCell className="text-xs">{record.date}</TableCell>
                      <TableCell>{record.inspector}</TableCell>
                      <TableCell>
                        <Badge className={`${grade.bg} ${grade.color} text-xs font-bold px-2`}>
                          {record.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{record.passCount}</span>
                        <span className="text-muted-foreground"> / {record.totalCount}</span>
                      </TableCell>
                      <TableCell>
                        <span className={record.passRate >= 95 ? "text-emerald-600" : record.passRate >= 90 ? "text-amber-600" : "text-red-600"}>
                          {record.passRate}%
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                        {record.issues}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 洗涤统计 */}
      <TabsContent value="stats" className="space-y-6">
        {/* 统计卡片 */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-100">
                <Droplets className="size-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">今日送洗</p>
                <p className="text-xl font-bold">{laundryStats.todayCount} <span className="text-sm text-muted-foreground font-normal">件</span></p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">平均周转</p>
                <p className="text-xl font-bold">{laundryStats.avgTurnaround} <span className="text-sm text-muted-foreground font-normal">小时</span></p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">平均合格率</p>
                <p className="text-xl font-bold">{laundryStats.avgPassRate}<span className="text-sm text-muted-foreground font-normal">%</span></p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-red-100">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">主要问题</p>
                <p className="text-xl font-bold">{laundryStats.topIssue}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 洗涤趋势图 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">近7日洗涤趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={laundryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis dataKey="date" tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                  <YAxis yAxisId="left" tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                  <YAxis yAxisId="right" orientation="right" domain={[90, 100]} tick={{ fill: "oklch(0.45 0 0)", fontSize: 12 }} axisLine={{ stroke: "oklch(0.92 0 0)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0 0)",
                      borderRadius: "8px",
                      color: "oklch(0.2 0 0)",
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="洗涤件数" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="passRate" name="合格率(%)" stroke="#34d399" strokeWidth={2} dot={{ r: 4, fill: "#34d399" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
