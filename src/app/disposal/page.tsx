"use client";

import {
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { disposalRecords, type ApprovalStatus } from "@/lib/mock-data";

const approvalStatusConfig: Record<ApprovalStatus, { color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  "待审批": { color: "text-amber-600", bg: "bg-amber-100", icon: Clock },
  "已通过": { color: "text-emerald-600", bg: "bg-emerald-100", icon: CheckCircle2 },
  "已驳回": { color: "text-red-600", bg: "bg-red-100", icon: XCircle },
};

export default function DisposalPage() {
  const pendingCount = disposalRecords.filter((r) => r.status === "待审批").length;
  const approvedCount = disposalRecords.filter((r) => r.status === "已通过").length;
  const totalDisposed = disposalRecords
    .filter((r) => r.status === "已通过")
    .reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-6">
      {/* 统计 */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">待审批</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100">
              <CheckCircle2 className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">已通过</p>
              <p className="text-2xl font-bold">{approvedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-100">
              <Trash2 className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">已核销数量</p>
              <p className="text-2xl font-bold">{totalDisposed} <span className="text-sm text-muted-foreground font-normal">件</span></p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">本月申请</p>
              <p className="text-2xl font-bold">{disposalRecords.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 审批流程图 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">报废审批流程</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 py-4">
            {[
              { label: "提交申请", desc: "填写报废信息" },
              { label: "主管审批", desc: "审核报废原因" },
              { label: "财务确认", desc: "核算资产价值" },
              { label: "资产核销", desc: "更新库存台账" },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                  <span className="text-[10px] text-muted-foreground">{step.desc}</span>
                </div>
                {idx < 3 && <ArrowRight className="size-4 text-muted-foreground mb-8" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 报废申请列表 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">报废申请列表</CardTitle>
            <Button size="sm" className="gap-1.5">
              <Plus className="size-3.5" />
              新建申请
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>申请单号</TableHead>
                <TableHead>申请日期</TableHead>
                <TableHead>申请人</TableHead>
                <TableHead>品类</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>报废原因</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>审批人</TableHead>
                <TableHead>审批日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disposalRecords.map((record, idx) => {
                const statusConf = approvalStatusConfig[record.status];
                const Icon = statusConf.icon;
                return (
                  <TableRow key={record.id} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                    <TableCell className="font-mono text-xs font-medium">{record.applyNo}</TableCell>
                    <TableCell className="text-xs">{record.applyDate}</TableCell>
                    <TableCell>{record.applicant}</TableCell>
                    <TableCell>{record.category}</TableCell>
                    <TableCell>
                      <span className="font-medium">{record.count}</span>
                      <span className="text-muted-foreground"> 件</span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                      {record.reason}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusConf.bg} ${statusConf.color} text-[10px] gap-1`}>
                        <Icon className="size-3" />
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.approver || "-"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{record.approveDate || "-"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
