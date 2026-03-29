"use client";

import { useState } from "react";
import {
  Search,
  ScanLine,
  Package,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  ShoppingCart,
  PackageCheck,
  Droplets,
  AlertTriangle,
  Trash2,
  ClipboardCheck,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trackingTimeline, rfidScanResults, type TrackingEvent } from "@/lib/mock-data";

const eventIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "采购": ShoppingCart,
  "入库": PackageCheck,
  "领用": ArrowRight,
  "归还": RotateCcw,
  "送洗": Droplets,
  "洗后入库": PackageCheck,
  "质检": ClipboardCheck,
  "报损": AlertTriangle,
  "报废": Trash2,
};

const eventColors: Record<string, string> = {
  "采购": "text-violet-600 bg-violet-100 border-violet-200",
  "入库": "text-green-600 bg-green-100 border-green-200",
  "领用": "text-blue-600 bg-blue-100 border-blue-200",
  "归还": "text-teal-600 bg-teal-100 border-teal-200",
  "送洗": "text-cyan-600 bg-cyan-100 border-cyan-200",
  "洗后入库": "text-emerald-600 bg-emerald-100 border-emerald-200",
  "质检": "text-amber-600 bg-amber-100 border-amber-200",
  "报损": "text-orange-600 bg-orange-100 border-orange-200",
  "报废": "text-red-600 bg-red-100 border-red-200",
};

function TimelineItem({ event, isLast }: { event: TrackingEvent; isLast: boolean }) {
  const Icon = eventIcons[event.type] || Clock;
  const colors = eventColors[event.type] || "text-muted-foreground bg-muted border-border";
  const colorParts = colors.split(" ");

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${colorParts[1]} ${colorParts[2]}`}>
          <Icon className={`size-4 ${colorParts[0]}`} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border my-1" />}
      </div>
      <div className={`pb-6 ${isLast ? "" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`${colorParts[1]} ${colorParts[0]} text-[11px]`}>{event.type}</Badge>
          <span className="text-xs text-muted-foreground">{event.time}</span>
        </div>
        <p className="mt-1.5 text-sm">{event.detail}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span>操作人: {event.operator}</span>
          {event.location && <span>位置: {event.location}</span>}
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const [searchCode, setSearchCode] = useState("BC-床-0001");
  const [showResult, setShowResult] = useState(true);

  return (
    <Tabs defaultValue="single" className="space-y-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="single">单品追踪</TabsTrigger>
        <TabsTrigger value="rfid">RFID批量扫描</TabsTrigger>
      </TabsList>

      {/* 单品追踪 */}
      <TabsContent value="single" className="space-y-6">
        <Card>
          <CardContent className="flex gap-3 p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="输入布草编码或扫码查询..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setShowResult(true)} className="gap-1.5">
              <Search className="size-3.5" />
              查询
            </Button>
            <Button variant="outline" className="gap-1.5">
              <ScanLine className="size-3.5" />
              扫码
            </Button>
          </CardContent>
        </Card>

        {showResult && (
          <>
            {/* 布草信息卡片 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">布草详情</CardTitle>
                  <Badge className="bg-amber-100 text-amber-600">报损</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">编码</p>
                    <p className="mt-0.5 font-mono text-sm font-medium">BC-床-0001</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">名称</p>
                    <p className="mt-0.5 text-sm font-medium">大床单（标准白色）</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">品类</p>
                    <p className="mt-0.5 text-sm font-medium">床单</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">RFID</p>
                    <p className="mt-0.5 font-mono text-sm font-medium">RFID00000001</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">采购日期</p>
                    <p className="mt-0.5 text-sm">2025-06-15</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">供应商</p>
                    <p className="mt-0.5 text-sm">洁丽雅纺织</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">洗涤次数</p>
                    <p className="mt-0.5 text-sm">
                      <span className="text-amber-600 font-medium">156</span>
                      <span className="text-muted-foreground"> / 200 次</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">当前位置</p>
                    <p className="mt-0.5 text-sm">主仓库B区（报损待处理）</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 生命周期时间线 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">生命周期追踪</CardTitle>
                  <span className="text-xs text-muted-foreground">共 {trackingTimeline.length} 条记录</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {[...trackingTimeline].reverse().map((event, idx) => (
                    <TimelineItem
                      key={event.id}
                      event={event}
                      isLast={idx === trackingTimeline.length - 1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </TabsContent>

      {/* RFID批量扫描 */}
      <TabsContent value="rfid" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">RFID 批量扫描结果</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1.5">
                  <ScanLine className="size-3.5" />
                  重新扫描
                </Button>
                <Button size="sm" className="gap-1.5">
                  确认盘点
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* 统计 */}
            <div className="mb-4 grid grid-cols-4 gap-3">
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-2xl font-bold">{rfidScanResults.length}</p>
                <p className="text-xs text-muted-foreground">扫描总数</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {rfidScanResults.filter((r) => r.matched).length}
                </p>
                <p className="text-xs text-muted-foreground">匹配成功</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">
                  {rfidScanResults.filter((r) => !r.matched && r.code !== "-").length}
                </p>
                <p className="text-xs text-muted-foreground">状态异常</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {rfidScanResults.filter((r) => r.code === "-").length}
                </p>
                <p className="text-xs text-muted-foreground">未识别</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>RFID 标签</TableHead>
                  <TableHead>编码</TableHead>
                  <TableHead>名称</TableHead>
                  <TableHead>系统状态</TableHead>
                  <TableHead>匹配结果</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rfidScanResults.map((result, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                    <TableCell className="font-mono text-xs">{result.rfid}</TableCell>
                    <TableCell className="font-mono text-xs">{result.code}</TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>
                      {result.code !== "-" ? (
                        <Badge className={
                          result.status === "在库"
                            ? "bg-emerald-100 text-emerald-600 text-[10px]"
                            : result.status === "在用"
                              ? "bg-blue-100 text-blue-600 text-[10px]"
                              : "bg-cyan-100 text-cyan-600 text-[10px]"
                        }>
                          {result.status}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {result.matched ? (
                        <div className="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle2 className="size-4" />
                          <span className="text-xs">匹配</span>
                        </div>
                      ) : result.code === "-" ? (
                        <div className="flex items-center gap-1.5 text-red-600">
                          <XCircle className="size-4" />
                          <span className="text-xs">未识别</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600">
                          <AlertTriangle className="size-4" />
                          <span className="text-xs">异常</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
