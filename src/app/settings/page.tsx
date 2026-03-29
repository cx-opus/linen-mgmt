"use client";

import { useState } from "react";
import {
  Settings,
  Package,
  Warehouse,
  Bell,
  Users,
  Save,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Progress } from "@/components/ui/progress";
import { linenCategories, warehouses } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <Tabs defaultValue="categories" className="space-y-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="categories" className="gap-1.5">
          <Package className="size-3.5" />
          品类管理
        </TabsTrigger>
        <TabsTrigger value="warehouses" className="gap-1.5">
          <Warehouse className="size-3.5" />
          仓库管理
        </TabsTrigger>
        <TabsTrigger value="alerts" className="gap-1.5">
          <Bell className="size-3.5" />
          预警规则
        </TabsTrigger>
        <TabsTrigger value="users" className="gap-1.5">
          <Users className="size-3.5" />
          用户权限
        </TabsTrigger>
      </TabsList>

      {/* 品类管理 */}
      <TabsContent value="categories" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">管理布草品类、规格及相关参数</p>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            新增品类
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>编码</TableHead>
                  <TableHead>品类名称</TableHead>
                  <TableHead>规格</TableHead>
                  <TableHead>材质</TableHead>
                  <TableHead>最大洗涤次数</TableHead>
                  <TableHead>安全库存</TableHead>
                  <TableHead>参考单价</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {linenCategories.map((cat, idx) => (
                  <TableRow key={cat.id} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                    <TableCell className="font-mono text-xs">{cat.id}</TableCell>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{cat.spec}</TableCell>
                    <TableCell className="text-xs">{cat.material}</TableCell>
                    <TableCell>{cat.maxWash} 次</TableCell>
                    <TableCell>{cat.safetyStock}</TableCell>
                    <TableCell>¥{cat.unitPrice}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="size-7 p-0">
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="size-7 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 仓库管理 */}
      <TabsContent value="warehouses" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">管理仓库和库位信息</p>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            新增仓库
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {warehouses.map((wh) => {
            const usagePercent = (wh.used / wh.capacity) * 100;
            return (
              <Card key={wh.id} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{wh.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{wh.location}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {wh.manager}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">使用率</span>
                      <span className={usagePercent > 90 ? "text-red-600 font-medium" : usagePercent > 70 ? "text-amber-600" : "text-emerald-600"}>
                        {usagePercent.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={usagePercent} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>已使用 {wh.used.toLocaleString()}</span>
                      <span>容量 {wh.capacity.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      {/* 预警规则 */}
      <TabsContent value="alerts" className="space-y-4">
        <p className="text-sm text-muted-foreground">配置库存预警阈值和通知规则</p>
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">库存预警阈值</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "大床单", danger: 100, warning: 150 },
                { name: "浴巾", danger: 100, warning: 150 },
                { name: "枕套", danger: 150, warning: 200 },
                { name: "面巾", danger: 200, warning: 300 },
                { name: "被套", danger: 200, warning: 250 },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="w-16 text-sm">{item.name}</span>
                  <div className="flex flex-1 items-center gap-2">
                    <Label className="text-xs text-red-600 w-12 shrink-0">紧急</Label>
                    <Input
                      type="number"
                      defaultValue={item.danger}
                      className="h-8 w-20 text-xs"
                    />
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <Label className="text-xs text-amber-600 w-12 shrink-0">预警</Label>
                    <Input
                      type="number"
                      defaultValue={item.warning}
                      className="h-8 w-20 text-xs"
                    />
                  </div>
                </div>
              ))}
              <Button size="sm" className="mt-2 gap-1.5">
                <Save className="size-3.5" />
                保存阈值
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">通知设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "库存不足预警", desc: "库存低于安全阈值时发送通知", enabled: true },
                { label: "洗涤超时提醒", desc: "送洗批次超过24小时未返回", enabled: true },
                { label: "报废审批提醒", desc: "有新的报废申请待审批", enabled: true },
                { label: "盘点差异提醒", desc: "盘点差异超过1%时通知", enabled: false },
                { label: "采购到货提醒", desc: "采购订单到货时通知", enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* 用户权限 */}
      <TabsContent value="users" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">管理系统用户和角色权限</p>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            添加用户
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>用户名</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>部门</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最近登录</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { username: "admin", name: "系统管理员", role: "超级管理员", dept: "信息部", status: "在线", lastLogin: "2026-03-29 14:30" },
                  { username: "zhangming", name: "张明", role: "仓库管理员", dept: "仓储部", status: "在线", lastLogin: "2026-03-29 14:15" },
                  { username: "lihua", name: "李华", role: "仓库管理员", dept: "仓储部", status: "在线", lastLogin: "2026-03-29 13:50" },
                  { username: "wangfang", name: "王芳", role: "质检员", dept: "品质部", status: "离线", lastLogin: "2026-03-29 12:00" },
                  { username: "liuqiang", name: "刘强", role: "采购专员", dept: "采购部", status: "在线", lastLogin: "2026-03-29 14:20" },
                  { username: "chenjing", name: "陈静", role: "质检员", dept: "品质部", status: "离线", lastLogin: "2026-03-28 18:00" },
                  { username: "zhaowei", name: "赵伟", role: "仓库管理员", dept: "仓储部", status: "离线", lastLogin: "2026-03-29 11:30" },
                  { username: "zhaozg", name: "赵主管", role: "部门主管", dept: "仓储部", status: "在线", lastLogin: "2026-03-29 14:00" },
                ].map((user, idx) => (
                  <TableRow key={user.username} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                    <TableCell className="font-mono text-xs">{user.username}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.dept}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={`size-2 rounded-full ${user.status === "在线" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                        <span className={`text-xs ${user.status === "在线" ? "text-emerald-600" : "text-muted-foreground"}`}>
                          {user.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="size-7 p-0">
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="size-7 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
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
