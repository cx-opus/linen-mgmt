"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  ScanLine,
  Package,
  PackageCheck,
  Droplets,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { inventoryItems, type LinenStatus } from "@/lib/mock-data";

const statusConfig: Record<
  LinenStatus,
  { color: string; bg: string; icon: React.ComponentType<{ className?: string }> }
> = {
  "在库": { color: "text-emerald-600", bg: "bg-emerald-100", icon: Package },
  "在用": { color: "text-blue-600", bg: "bg-blue-100", icon: PackageCheck },
  "清洗中": { color: "text-cyan-600", bg: "bg-cyan-100", icon: Droplets },
  "报损": { color: "text-amber-600", bg: "bg-amber-100", icon: AlertTriangle },
  "报废": { color: "text-red-600", bg: "bg-red-100", icon: XCircle },
};

function StatusBadge({ status }: { status: LinenStatus }) {
  const config = statusConfig[status];
  return (
    <Badge className={`${config.bg} ${config.color} hover:${config.bg} text-[11px] gap-1`}>
      {status}
    </Badge>
  );
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchSearch =
        !search ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.name.includes(search) ||
        item.location.includes(search);
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    inventoryItems.forEach((item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <Tabs defaultValue="list" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="list">库存列表</TabsTrigger>
          <TabsTrigger value="inbound">入库登记</TabsTrigger>
          <TabsTrigger value="outbound">领用出库</TabsTrigger>
          <TabsTrigger value="stocktake">库存盘点</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="size-3.5" />
            导出
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            新增布草
          </Button>
        </div>
      </div>

      {/* 库存列表 */}
      <TabsContent value="list" className="space-y-4">
        {/* 统计卡片 */}
        <div className="grid gap-3 sm:grid-cols-5">
          {(Object.entries(statusConfig) as [LinenStatus, typeof statusConfig[LinenStatus]][]).map(
            ([status, config]) => {
              const Icon = config.icon;
              return (
                <Card
                  key={status}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    statusFilter === status ? "ring-1 ring-primary" : ""
                  }`}
                  onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
                >
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className={`flex size-9 items-center justify-center rounded-lg ${config.bg}`}>
                      <Icon className={`size-4 ${config.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{status}</p>
                      <p className="text-lg font-bold">{statusCounts[status] || 0}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>

        {/* 筛选 */}
        <Card>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索编码、名称、位置..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
                <SelectTrigger className="w-[120px]">
                  <Filter className="mr-1.5 size-3.5" />
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="在库">在库</SelectItem>
                  <SelectItem value="在用">在用</SelectItem>
                  <SelectItem value="清洗中">清洗中</SelectItem>
                  <SelectItem value="报损">报损</SelectItem>
                  <SelectItem value="报废">报废</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(v) => v && setCategoryFilter(v)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="品类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部品类</SelectItem>
                  <SelectItem value="床单">床单</SelectItem>
                  <SelectItem value="被套">被套</SelectItem>
                  <SelectItem value="枕套">枕套</SelectItem>
                  <SelectItem value="浴巾">浴巾</SelectItem>
                  <SelectItem value="面巾">面巾</SelectItem>
                  <SelectItem value="地巾">地巾</SelectItem>
                  <SelectItem value="浴袍">浴袍</SelectItem>
                  <SelectItem value="桌布">桌布</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 表格 */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[130px]">编码</TableHead>
                    <TableHead>名称</TableHead>
                    <TableHead>品类</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>位置</TableHead>
                    <TableHead>洗涤次数</TableHead>
                    <TableHead>RFID</TableHead>
                    <TableHead>供应商</TableHead>
                    <TableHead className="text-right">上次清洗</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Package className="size-8 text-muted-foreground/50" />
                          <span>没有找到匹配的布草记录</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((item, idx) => {
                      const washPercent = (item.washCount / item.maxWashCount) * 100;
                      return (
                        <TableRow
                          key={item.id}
                          className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}
                        >
                          <TableCell className="font-mono text-xs">{item.code}</TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">{item.location}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={washPercent}
                                className="h-1.5 w-12"
                              />
                              <span className={`text-xs ${washPercent > 80 ? "text-red-600" : "text-muted-foreground"}`}>
                                {item.washCount}/{item.maxWashCount}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {item.rfidTag.slice(0, 12)}...
                          </TableCell>
                          <TableCell className="text-muted-foreground">{item.supplier}</TableCell>
                          <TableCell className="text-right text-xs text-muted-foreground">
                            {item.lastWashDate}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <span className="text-xs text-muted-foreground">
                共 {filtered.length} 条记录
              </span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  下一页
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 入库登记 */}
      <TabsContent value="inbound">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">入库登记</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>布草品类</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择品类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedsheet">床单</SelectItem>
                    <SelectItem value="duvet">被套</SelectItem>
                    <SelectItem value="pillow">枕套</SelectItem>
                    <SelectItem value="towel">浴巾</SelectItem>
                    <SelectItem value="facetowel">面巾</SelectItem>
                    <SelectItem value="floortowel">地巾</SelectItem>
                    <SelectItem value="bathrobe">浴袍</SelectItem>
                    <SelectItem value="tablecloth">桌布</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>入库数量</Label>
                <Input type="number" placeholder="请输入数量" />
              </div>
              <div className="space-y-2">
                <Label>供应商</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择供应商" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jieliya">洁丽雅纺织</SelectItem>
                    <SelectItem value="mengjie">梦洁家纺</SelectItem>
                    <SelectItem value="fuanna">富安娜</SelectItem>
                    <SelectItem value="luolai">罗莱生活</SelectItem>
                    <SelectItem value="mercury">水星家纺</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>入库仓位</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择仓位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">主仓库A区</SelectItem>
                    <SelectItem value="b">主仓库B区</SelectItem>
                    <SelectItem value="2f">2F备品间</SelectItem>
                    <SelectItem value="3f">3F备品间</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>采购单号</Label>
                <Input placeholder="关联采购单号（可选）" />
              </div>
              <div className="space-y-2">
                <Label>RFID标签范围</Label>
                <Input placeholder="起始标签号" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>备注</Label>
                <Textarea placeholder="入库备注信息..." rows={3} />
              </div>
              <div className="sm:col-span-2">
                <div className="flex gap-3">
                  <Button className="gap-1.5">
                    <ScanLine className="size-4" />
                    扫描RFID入库
                  </Button>
                  <Button variant="outline">手动入库</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 领用出库 */}
      <TabsContent value="outbound">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">领用出库</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>目标楼层</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择楼层" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1F", "2F", "3F", "5F", "6F", "7F", "8F", "9F", "10F"].map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>房间号</Label>
                <Input placeholder="如: 301, 302" />
              </div>
              <div className="space-y-2">
                <Label>布草品类</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择品类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedsheet">床单</SelectItem>
                    <SelectItem value="duvet">被套</SelectItem>
                    <SelectItem value="pillow">枕套</SelectItem>
                    <SelectItem value="towel">浴巾</SelectItem>
                    <SelectItem value="facetowel">面巾</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>领用数量</Label>
                <Input type="number" placeholder="请输入数量" />
              </div>
              <div className="space-y-2">
                <Label>领用人</Label>
                <Input placeholder="领用人姓名" />
              </div>
              <div className="space-y-2">
                <Label>领用原因</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择原因" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkin">客户入住</SelectItem>
                    <SelectItem value="replace">更换补充</SelectItem>
                    <SelectItem value="event">会议活动</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>备注</Label>
                <Textarea placeholder="出库备注信息..." rows={3} />
              </div>
              <div className="sm:col-span-2">
                <div className="flex gap-3">
                  <Button className="gap-1.5">
                    <ScanLine className="size-4" />
                    扫描出库
                  </Button>
                  <Button variant="outline">确认出库</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 库存盘点 */}
      <TabsContent value="stocktake">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">库存盘点</CardTitle>
                <Button size="sm" className="gap-1.5">
                  <ScanLine className="size-3.5" />
                  开始RFID盘点
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>盘点范围</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择仓库" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部仓库</SelectItem>
                      <SelectItem value="main-a">主仓库A区</SelectItem>
                      <SelectItem value="main-b">主仓库B区</SelectItem>
                      <SelectItem value="2f">2F备品间</SelectItem>
                      <SelectItem value="3f">3F备品间</SelectItem>
                      <SelectItem value="5f">5F备品间</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>盘点品类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择品类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部品类</SelectItem>
                      <SelectItem value="bedsheet">床单</SelectItem>
                      <SelectItem value="towel">浴巾</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>盘点人</Label>
                  <Input placeholder="盘点人姓名" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 最近盘点记录 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">最近盘点记录</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>盘点日期</TableHead>
                    <TableHead>范围</TableHead>
                    <TableHead>盘点人</TableHead>
                    <TableHead>系统数量</TableHead>
                    <TableHead>实际数量</TableHead>
                    <TableHead>差异</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "2026-03-29", scope: "2F仓库", operator: "赵伟", system: 256, actual: 253, diff: -3, status: "已完成" },
                    { date: "2026-03-25", scope: "主仓库A区", operator: "张明", system: 3450, actual: 3448, diff: -2, status: "已完成" },
                    { date: "2026-03-20", scope: "全部仓库", operator: "李华", system: 5890, actual: 5885, diff: -5, status: "已完成" },
                    { date: "2026-03-15", scope: "5F备品间", operator: "王芳", system: 198, actual: 198, diff: 0, status: "已完成" },
                  ].map((record, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.scope}</TableCell>
                      <TableCell>{record.operator}</TableCell>
                      <TableCell>{record.system}</TableCell>
                      <TableCell>{record.actual}</TableCell>
                      <TableCell>
                        <span className={record.diff < 0 ? "text-red-600" : record.diff > 0 ? "text-amber-600" : "text-emerald-600"}>
                          {record.diff > 0 ? "+" : ""}{record.diff}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-600 text-[10px]">{record.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
