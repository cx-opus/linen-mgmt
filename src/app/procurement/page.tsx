"use client";

import {
  ShoppingCart,
  Plus,
  Star,
  Phone,
  Mail,
  MapPin,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { procurementRecords, supplierList } from "@/lib/mock-data";

const procStatusConfig: Record<string, { color: string; bg: string }> = {
  "待审批": { color: "text-amber-600", bg: "bg-amber-100" },
  "已批准": { color: "text-blue-600", bg: "bg-blue-100" },
  "采购中": { color: "text-cyan-600", bg: "bg-cyan-100" },
  "已到货": { color: "text-violet-600", bg: "bg-violet-100" },
  "已验收": { color: "text-emerald-600", bg: "bg-emerald-100" },
};

const supplierStatusConfig: Record<string, { color: string; bg: string }> = {
  "合作中": { color: "text-emerald-600", bg: "bg-emerald-100" },
  "已暂停": { color: "text-amber-600", bg: "bg-amber-100" },
  "已终止": { color: "text-red-600", bg: "bg-red-100" },
};

export default function ProcurementPage() {
  const totalAmount = procurementRecords.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <Tabs defaultValue="orders" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="orders">采购申请</TabsTrigger>
          <TabsTrigger value="suppliers">供应商管理</TabsTrigger>
        </TabsList>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          新建采购
        </Button>
      </div>

      {/* 采购申请 */}
      <TabsContent value="orders" className="space-y-4">
        {/* 统计 */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">本月采购单</p>
              <p className="mt-1 text-2xl font-bold">{procurementRecords.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">采购总金额</p>
              <p className="mt-1 text-2xl font-bold">¥{totalAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">待审批</p>
              <p className="mt-1 text-2xl font-bold text-amber-600">
                {procurementRecords.filter((r) => r.status === "待审批").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">进行中</p>
              <p className="mt-1 text-2xl font-bold text-blue-600">
                {procurementRecords.filter((r) => r.status === "采购中" || r.status === "已批准").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>采购单号</TableHead>
                  <TableHead>日期</TableHead>
                  <TableHead>供应商</TableHead>
                  <TableHead>品类</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>单价</TableHead>
                  <TableHead>总金额</TableHead>
                  <TableHead>预计到货</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {procurementRecords.map((record, idx) => {
                  const statusConf = procStatusConfig[record.status];
                  return (
                    <TableRow key={record.id} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                      <TableCell className="font-mono text-xs font-medium">{record.orderNo}</TableCell>
                      <TableCell className="text-xs">{record.orderDate}</TableCell>
                      <TableCell>{record.supplier}</TableCell>
                      <TableCell>{record.category}</TableCell>
                      <TableCell className="font-medium">{record.quantity}</TableCell>
                      <TableCell className="text-muted-foreground">¥{record.unitPrice}</TableCell>
                      <TableCell className="font-medium">¥{record.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs">{record.expectedDate}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConf.bg} ${statusConf.color} text-[10px]`}>
                          {record.status}
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

      {/* 供应商管理 */}
      <TabsContent value="suppliers" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {supplierList.map((supplier) => {
            const statusConf = supplierStatusConfig[supplier.status];
            return (
              <Card key={supplier.id} className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="size-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{supplier.name}</h3>
                        <p className="text-xs text-muted-foreground">{supplier.category}</p>
                      </div>
                    </div>
                    <Badge className={`${statusConf.bg} ${statusConf.color} text-[10px]`}>
                      {supplier.status}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-3" />
                      <span>{supplier.contact} {supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="size-3" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>{supplier.address}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-500 text-amber-600" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      合作自 {supplier.cooperationDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
}
