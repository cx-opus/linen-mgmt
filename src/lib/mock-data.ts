// 布草资产管理系统 - Mock 数据

// ===== 类型定义 =====
export type LinenStatus = "在库" | "在用" | "清洗中" | "报损" | "报废";
export type AlertLevel = "danger" | "warning" | "normal";
export type ApprovalStatus = "待审批" | "已通过" | "已驳回";
export type QualityGrade = "A" | "B" | "C" | "D";

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: string;
  status: LinenStatus;
  location: string;
  floor: string;
  room: string;
  washCount: number;
  maxWashCount: number;
  rfidTag: string;
  purchaseDate: string;
  lastWashDate: string;
  supplier: string;
}

export interface AlertItem {
  id: string;
  category: string;
  current: number;
  threshold: number;
  level: AlertLevel;
  message: string;
}

export interface OperationLog {
  id: string;
  time: string;
  operator: string;
  action: string;
  target: string;
  detail: string;
}

export interface LaundryBatch {
  id: string;
  batchNo: string;
  sendDate: string;
  returnDate: string | null;
  count: number;
  status: "送洗中" | "已清洗" | "质检中" | "已入库";
  supplier: string;
  temperature: number;
  duration: number;
  detergent: string;
}

export interface QualityRecord {
  id: string;
  batchNo: string;
  inspector: string;
  date: string;
  grade: QualityGrade;
  passRate: number;
  totalCount: number;
  passCount: number;
  issues: string;
}

export interface DisposalRecord {
  id: string;
  applyNo: string;
  applyDate: string;
  applicant: string;
  category: string;
  count: number;
  reason: string;
  status: ApprovalStatus;
  approver: string | null;
  approveDate: string | null;
}

export interface ProcurementRecord {
  id: string;
  orderNo: string;
  orderDate: string;
  supplier: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: "待审批" | "已批准" | "采购中" | "已到货" | "已验收";
  expectedDate: string;
  applicant: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  rating: number;
  cooperationDate: string;
  status: "合作中" | "已暂停" | "已终止";
}

export interface TrackingEvent {
  id: string;
  time: string;
  type: "采购" | "入库" | "领用" | "归还" | "送洗" | "洗后入库" | "质检" | "报损" | "报废";
  detail: string;
  operator: string;
  location?: string;
}

// ===== Dashboard 统计 =====
export const dashboardStats = {
  totalInventory: 12580,
  inUse: 8234,
  inWash: 2156,
  damaged: 432,
  disposed: 158,
  todayDispatch: 856,
  todayReturn: 723,
  todayDisposal: 15,
};

// ===== 库存预警 =====
export const alerts: AlertItem[] = [
  { id: "A001", category: "大床单", current: 45, threshold: 100, level: "danger", message: "库存严重不足，请尽快采购" },
  { id: "A002", category: "浴巾", current: 78, threshold: 100, level: "danger", message: "库存低于安全值" },
  { id: "A003", category: "枕套", current: 120, threshold: 150, level: "warning", message: "库存偏低，建议补充" },
  { id: "A004", category: "面巾", current: 156, threshold: 200, level: "warning", message: "库存偏低，建议关注" },
  { id: "A005", category: "被套", current: 280, threshold: 200, level: "normal", message: "库存充足" },
  { id: "A006", category: "地巾", current: 340, threshold: 200, level: "normal", message: "库存充足" },
  { id: "A007", category: "浴袍", current: 95, threshold: 80, level: "normal", message: "库存充足" },
  { id: "A008", category: "桌布", current: 60, threshold: 80, level: "warning", message: "库存偏低" },
];

// ===== 库存趋势数据（近30天） =====
export const inventoryTrend = [
  { date: "03/01", total: 12200, inUse: 7900, inWash: 2100 },
  { date: "03/03", total: 12250, inUse: 7950, inWash: 2050 },
  { date: "03/05", total: 12300, inUse: 8000, inWash: 2100 },
  { date: "03/07", total: 12280, inUse: 8050, inWash: 2080 },
  { date: "03/09", total: 12350, inUse: 8100, inWash: 2100 },
  { date: "03/11", total: 12400, inUse: 8150, inWash: 2050 },
  { date: "03/13", total: 12380, inUse: 8100, inWash: 2120 },
  { date: "03/15", total: 12420, inUse: 8180, inWash: 2080 },
  { date: "03/17", total: 12450, inUse: 8200, inWash: 2100 },
  { date: "03/19", total: 12480, inUse: 8220, inWash: 2120 },
  { date: "03/21", total: 12500, inUse: 8250, inWash: 2100 },
  { date: "03/23", total: 12520, inUse: 8200, inWash: 2150 },
  { date: "03/25", total: 12550, inUse: 8210, inWash: 2170 },
  { date: "03/27", total: 12560, inUse: 8220, inWash: 2160 },
  { date: "03/29", total: 12580, inUse: 8234, inWash: 2156 },
];

// ===== 品类库存分布 =====
export const categoryDistribution = [
  { name: "床单", value: 2850, color: "#4f8ef7" },
  { name: "被套", value: 2200, color: "#34d399" },
  { name: "枕套", value: 2680, color: "#fbbf24" },
  { name: "浴巾", value: 1890, color: "#f472b6" },
  { name: "面巾", value: 1560, color: "#a78bfa" },
  { name: "地巾", value: 680, color: "#fb923c" },
  { name: "浴袍", value: 420, color: "#22d3ee" },
  { name: "桌布", value: 300, color: "#94a3b8" },
];

// ===== 楼层消耗对比 =====
export const floorConsumption = [
  { floor: "1F", consumption: 320, return: 298 },
  { floor: "2F", consumption: 456, return: 420 },
  { floor: "3F", consumption: 528, return: 501 },
  { floor: "5F", consumption: 612, return: 580 },
  { floor: "6F", consumption: 489, return: 465 },
  { floor: "7F", consumption: 534, return: 510 },
  { floor: "8F", consumption: 445, return: 420 },
  { floor: "9F", consumption: 390, return: 370 },
  { floor: "10F", consumption: 367, return: 350 },
];

// ===== 操作日志 =====
export const operationLogs: OperationLog[] = [
  { id: "L001", time: "2026-03-29 14:32", operator: "张明", action: "领用出库", target: "3F-301房", detail: "床单x4, 枕套x4, 浴巾x2" },
  { id: "L002", time: "2026-03-29 14:15", operator: "李华", action: "送洗登记", target: "批次WB20260329-05", detail: "共156件布草送至洁达洗涤" },
  { id: "L003", time: "2026-03-29 13:48", operator: "王芳", action: "质检完成", target: "批次WB20260329-03", detail: "A级通过率98.2%，共240件" },
  { id: "L004", time: "2026-03-29 13:20", operator: "刘强", action: "入库登记", target: "新采购批次", detail: "大床单200件, 浴巾150件" },
  { id: "L005", time: "2026-03-29 12:55", operator: "陈静", action: "报废申请", target: "编号BQ-2026-0087", detail: "破损床单12件, 已超洗涤次数" },
  { id: "L006", time: "2026-03-29 11:40", operator: "张明", action: "归还入库", target: "5F-506房", detail: "床单x2, 被套x2, 枕套x4" },
  { id: "L007", time: "2026-03-29 11:15", operator: "赵伟", action: "RFID盘点", target: "2F仓库", detail: "盘点256件, 差异3件" },
  { id: "L008", time: "2026-03-29 10:30", operator: "李华", action: "洗后入库", target: "批次WB20260328-08", detail: "共320件, 质检A级" },
];

// ===== 库存列表 =====
const statusOptions: LinenStatus[] = ["在库", "在用", "清洗中", "报损", "报废"];
const categories = ["床单", "被套", "枕套", "浴巾", "面巾", "地巾", "浴袍", "桌布"];
const floors = ["1F", "2F", "3F", "5F", "6F", "7F", "8F", "9F", "10F"];
const suppliers = ["洁丽雅纺织", "梦洁家纺", "富安娜", "罗莱生活", "水星家纺"];
const locations = ["主仓库A区", "主仓库B区", "2F备品间", "3F备品间", "5F备品间", "客房在用", "洗涤中心"];

function generateInventoryItems(): InventoryItem[] {
  const items: InventoryItem[] = [];
  for (let i = 1; i <= 50; i++) {
    const catIdx = (i - 1) % categories.length;
    const statusIdx = i <= 20 ? 0 : i <= 35 ? 1 : i <= 43 ? 2 : i <= 47 ? 3 : 4;
    const floorIdx = i % floors.length;
    const roomNum = 100 + (i % 20) + 1;
    items.push({
      id: `INV${String(i).padStart(5, "0")}`,
      code: `BC-${categories[catIdx].charAt(0)}-${String(i).padStart(4, "0")}`,
      name: `${categories[catIdx]}（标准白色）`,
      category: categories[catIdx],
      status: statusOptions[statusIdx],
      location: statusIdx === 1 ? `${floors[floorIdx]}-${roomNum}房` : statusIdx === 2 ? "洗涤中心" : locations[i % 5],
      floor: floors[floorIdx],
      room: statusIdx === 1 ? `${roomNum}` : "-",
      washCount: Math.floor(Math.random() * 180) + 20,
      maxWashCount: 200,
      rfidTag: `RFID${String(i).padStart(8, "0")}`,
      purchaseDate: `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      lastWashDate: `2026-03-${String(Math.max(1, 29 - (i % 10))).padStart(2, "0")}`,
      supplier: suppliers[i % suppliers.length],
    });
  }
  return items;
}

export const inventoryItems = generateInventoryItems();

// ===== 洗涤批次 =====
export const laundryBatches: LaundryBatch[] = [
  { id: "LB001", batchNo: "WB20260329-01", sendDate: "2026-03-29 08:00", returnDate: null, count: 186, status: "送洗中", supplier: "洁达洗涤", temperature: 60, duration: 45, detergent: "专业酒店洗涤剂A" },
  { id: "LB002", batchNo: "WB20260329-02", sendDate: "2026-03-29 06:30", returnDate: null, count: 220, status: "质检中", supplier: "洁达洗涤", temperature: 65, duration: 50, detergent: "专业酒店洗涤剂A" },
  { id: "LB003", batchNo: "WB20260329-03", sendDate: "2026-03-29 06:00", returnDate: "2026-03-29 13:00", count: 240, status: "已入库", supplier: "洁达洗涤", temperature: 60, duration: 45, detergent: "专业酒店洗涤剂B" },
  { id: "LB004", batchNo: "WB20260328-08", sendDate: "2026-03-28 14:00", returnDate: "2026-03-29 10:00", count: 320, status: "已入库", supplier: "白云洗涤", temperature: 70, duration: 55, detergent: "专业酒店洗涤剂A" },
  { id: "LB005", batchNo: "WB20260328-07", sendDate: "2026-03-28 10:00", returnDate: "2026-03-28 18:00", count: 198, status: "已入库", supplier: "洁达洗涤", temperature: 60, duration: 45, detergent: "专业酒店洗涤剂A" },
  { id: "LB006", batchNo: "WB20260328-06", sendDate: "2026-03-28 08:00", returnDate: "2026-03-28 16:00", count: 275, status: "已入库", supplier: "白云洗涤", temperature: 65, duration: 50, detergent: "专业酒店洗涤剂B" },
  { id: "LB007", batchNo: "WB20260327-05", sendDate: "2026-03-27 14:00", returnDate: "2026-03-28 10:00", count: 310, status: "已入库", supplier: "洁达洗涤", temperature: 60, duration: 45, detergent: "专业酒店洗涤剂A" },
  { id: "LB008", batchNo: "WB20260327-04", sendDate: "2026-03-27 08:00", returnDate: "2026-03-27 16:00", count: 245, status: "已入库", supplier: "白云洗涤", temperature: 70, duration: 55, detergent: "专业酒店洗涤剂A" },
];

// ===== 质检记录 =====
export const qualityRecords: QualityRecord[] = [
  { id: "QC001", batchNo: "WB20260329-03", inspector: "王芳", date: "2026-03-29 13:00", grade: "A", passRate: 98.2, totalCount: 240, passCount: 236, issues: "4件轻微褪色" },
  { id: "QC002", batchNo: "WB20260328-08", inspector: "王芳", date: "2026-03-29 09:30", grade: "A", passRate: 99.1, totalCount: 320, passCount: 317, issues: "3件边缘轻微磨损" },
  { id: "QC003", batchNo: "WB20260328-07", inspector: "陈静", date: "2026-03-28 17:30", grade: "B", passRate: 95.5, totalCount: 198, passCount: 189, issues: "9件洗涤残留, 需重洗" },
  { id: "QC004", batchNo: "WB20260328-06", inspector: "王芳", date: "2026-03-28 15:30", grade: "A", passRate: 97.8, totalCount: 275, passCount: 269, issues: "6件轻微起球" },
  { id: "QC005", batchNo: "WB20260327-05", inspector: "陈静", date: "2026-03-28 09:30", grade: "A", passRate: 98.7, totalCount: 310, passCount: 306, issues: "4件色差偏大" },
  { id: "QC006", batchNo: "WB20260327-04", inspector: "王芳", date: "2026-03-27 15:30", grade: "C", passRate: 89.0, totalCount: 245, passCount: 218, issues: "27件严重褪色, 建议更换洗涤剂" },
];

// ===== 报废记录 =====
export const disposalRecords: DisposalRecord[] = [
  { id: "D001", applyNo: "BQ-2026-0087", applyDate: "2026-03-29", applicant: "陈静", category: "床单", count: 12, reason: "超最大洗涤次数，布料严重老化", status: "待审批", approver: null, approveDate: null },
  { id: "D002", applyNo: "BQ-2026-0086", applyDate: "2026-03-28", applicant: "张明", category: "浴巾", count: 8, reason: "多处破损，无法修补", status: "待审批", approver: null, approveDate: null },
  { id: "D003", applyNo: "BQ-2026-0085", applyDate: "2026-03-27", applicant: "李华", category: "枕套", count: 20, reason: "严重褪色，影响客户体验", status: "已通过", approver: "赵主管", approveDate: "2026-03-28" },
  { id: "D004", applyNo: "BQ-2026-0084", applyDate: "2026-03-26", applicant: "王芳", category: "被套", count: 6, reason: "接缝开裂，洗涤次数达上限", status: "已通过", approver: "赵主管", approveDate: "2026-03-27" },
  { id: "D005", applyNo: "BQ-2026-0083", applyDate: "2026-03-25", applicant: "陈静", category: "面巾", count: 30, reason: "批量老化，洗涤次数超标", status: "已通过", approver: "赵主管", approveDate: "2026-03-26" },
  { id: "D006", applyNo: "BQ-2026-0082", applyDate: "2026-03-24", applicant: "张明", category: "地巾", count: 15, reason: "严重磨损变形", status: "已驳回", approver: "赵主管", approveDate: "2026-03-25" },
  { id: "D007", applyNo: "BQ-2026-0081", applyDate: "2026-03-22", applicant: "李华", category: "浴袍", count: 5, reason: "腰带丢失，拉链损坏", status: "已通过", approver: "赵主管", approveDate: "2026-03-23" },
];

// ===== 采购记录 =====
export const procurementRecords: ProcurementRecord[] = [
  { id: "P001", orderNo: "PO-2026-0034", orderDate: "2026-03-28", supplier: "洁丽雅纺织", category: "床单", quantity: 200, unitPrice: 85, totalAmount: 17000, status: "待审批", expectedDate: "2026-04-05", applicant: "刘强" },
  { id: "P002", orderNo: "PO-2026-0033", orderDate: "2026-03-27", supplier: "梦洁家纺", category: "浴巾", quantity: 150, unitPrice: 45, totalAmount: 6750, status: "已批准", expectedDate: "2026-04-03", applicant: "刘强" },
  { id: "P003", orderNo: "PO-2026-0032", orderDate: "2026-03-25", supplier: "富安娜", category: "被套", quantity: 100, unitPrice: 120, totalAmount: 12000, status: "采购中", expectedDate: "2026-04-01", applicant: "刘强" },
  { id: "P004", orderNo: "PO-2026-0031", orderDate: "2026-03-23", supplier: "洁丽雅纺织", category: "枕套", quantity: 300, unitPrice: 25, totalAmount: 7500, status: "已到货", expectedDate: "2026-03-28", applicant: "张明" },
  { id: "P005", orderNo: "PO-2026-0030", orderDate: "2026-03-20", supplier: "罗莱生活", category: "浴袍", quantity: 50, unitPrice: 180, totalAmount: 9000, status: "已验收", expectedDate: "2026-03-26", applicant: "刘强" },
  { id: "P006", orderNo: "PO-2026-0029", orderDate: "2026-03-18", supplier: "水星家纺", category: "面巾", quantity: 400, unitPrice: 15, totalAmount: 6000, status: "已验收", expectedDate: "2026-03-24", applicant: "张明" },
  { id: "P007", orderNo: "PO-2026-0028", orderDate: "2026-03-15", supplier: "梦洁家纺", category: "地巾", quantity: 200, unitPrice: 35, totalAmount: 7000, status: "已验收", expectedDate: "2026-03-22", applicant: "刘强" },
];

// ===== 供应商 =====
export const supplierList: Supplier[] = [
  { id: "S001", name: "洁丽雅纺织", contact: "周经理", phone: "138-0000-1234", email: "zhou@jieliya.com", address: "浙江省绍兴市柯桥区", category: "布草生产", rating: 4.8, cooperationDate: "2023-01-15", status: "合作中" },
  { id: "S002", name: "梦洁家纺", contact: "刘经理", phone: "139-0000-5678", email: "liu@mengjie.com", address: "湖南省长沙市芙蓉区", category: "布草生产", rating: 4.6, cooperationDate: "2023-03-20", status: "合作中" },
  { id: "S003", name: "富安娜", contact: "陈经理", phone: "136-0000-9012", email: "chen@fuanna.com", address: "广东省深圳市龙华区", category: "布草生产", rating: 4.5, cooperationDate: "2023-06-10", status: "合作中" },
  { id: "S004", name: "罗莱生活", contact: "王经理", phone: "137-0000-3456", email: "wang@luolai.com", address: "上海市松江区", category: "布草生产", rating: 4.7, cooperationDate: "2024-01-08", status: "合作中" },
  { id: "S005", name: "水星家纺", contact: "张经理", phone: "135-0000-7890", email: "zhang@mercury.com", address: "上海市奉贤区", category: "布草生产", rating: 4.3, cooperationDate: "2024-05-15", status: "合作中" },
  { id: "S006", name: "洁达洗涤", contact: "赵经理", phone: "131-0000-2345", email: "zhao@jieda.com", address: "本市工业园区A座", category: "洗涤服务", rating: 4.9, cooperationDate: "2022-08-01", status: "合作中" },
  { id: "S007", name: "白云洗涤", contact: "孙经理", phone: "132-0000-6789", email: "sun@baiyun.com", address: "本市工业园区C座", category: "洗涤服务", rating: 4.4, cooperationDate: "2023-11-20", status: "合作中" },
  { id: "S008", name: "恒源祥纺织", contact: "李经理", phone: "133-0000-1111", email: "li@hengyuanxiang.com", address: "上海市青浦区", category: "布草生产", rating: 4.1, cooperationDate: "2024-02-10", status: "已暂停" },
];

// ===== 布草追踪时间线 =====
export const trackingTimeline: TrackingEvent[] = [
  { id: "T001", time: "2025-06-15 10:00", type: "采购", detail: "通过采购单PO-2025-0120从洁丽雅纺织采购入库", operator: "刘强" },
  { id: "T002", time: "2025-06-15 14:30", type: "入库", detail: "登记入库至主仓库A区-A3货架", operator: "张明", location: "主仓库A区" },
  { id: "T003", time: "2025-06-18 08:20", type: "领用", detail: "领用至5F-502号房", operator: "张明", location: "5F-502" },
  { id: "T004", time: "2025-06-20 09:00", type: "归还", detail: "客房退房回收", operator: "李华", location: "5F备品间" },
  { id: "T005", time: "2025-06-20 10:30", type: "送洗", detail: "编入洗涤批次WB20250620-03", operator: "李华" },
  { id: "T006", time: "2025-06-21 09:00", type: "质检", detail: "洗后质检通过，等级A", operator: "王芳" },
  { id: "T007", time: "2025-06-21 10:00", type: "洗后入库", detail: "质检合格入库，累计洗涤12次", operator: "王芳", location: "主仓库A区" },
  { id: "T008", time: "2025-06-25 07:45", type: "领用", detail: "领用至7F-703号房", operator: "张明", location: "7F-703" },
  { id: "T009", time: "2025-06-27 09:30", type: "归还", detail: "客房退房回收", operator: "李华", location: "7F备品间" },
  { id: "T010", time: "2025-06-27 11:00", type: "送洗", detail: "编入洗涤批次WB20250627-02", operator: "李华" },
  { id: "T011", time: "2025-06-28 09:00", type: "质检", detail: "洗后质检通过，等级A", operator: "王芳" },
  { id: "T012", time: "2025-06-28 10:00", type: "洗后入库", detail: "质检合格入库，累计洗涤13次", operator: "王芳", location: "主仓库A区" },
  { id: "T013", time: "2026-03-15 08:00", type: "领用", detail: "领用至3F-301号房", operator: "张明", location: "3F-301" },
  { id: "T014", time: "2026-03-20 09:30", type: "归还", detail: "客房退房回收", operator: "李华", location: "3F备品间" },
  { id: "T015", time: "2026-03-20 14:00", type: "送洗", detail: "编入洗涤批次WB20260320-01", operator: "李华" },
  { id: "T016", time: "2026-03-21 09:00", type: "质检", detail: "洗后质检通过，等级B（轻微起球）", operator: "陈静" },
  { id: "T017", time: "2026-03-21 10:00", type: "洗后入库", detail: "质检合格入库，累计洗涤156次", operator: "陈静", location: "主仓库B区" },
  { id: "T018", time: "2026-03-28 08:00", type: "报损", detail: "巡检发现边缘磨损严重，标记为报损", operator: "王芳" },
];

// ===== 月度消耗分析（报表用） =====
export const monthlyConsumption = [
  { month: "2025-10", purchase: 1200, dispose: 180, wash: 28500, cost: 125000 },
  { month: "2025-11", purchase: 800, dispose: 150, wash: 27800, cost: 118000 },
  { month: "2025-12", purchase: 1500, dispose: 220, wash: 31200, cost: 142000 },
  { month: "2026-01", purchase: 600, dispose: 130, wash: 26500, cost: 112000 },
  { month: "2026-02", purchase: 900, dispose: 160, wash: 29000, cost: 128000 },
  { month: "2026-03", purchase: 1100, dispose: 158, wash: 30500, cost: 135000 },
];

// ===== RFID扫描结果 =====
export const rfidScanResults = [
  { rfid: "RFID00000001", code: "BC-床-0001", name: "床单（标准白色）", status: "在库" as LinenStatus, matched: true },
  { rfid: "RFID00000002", code: "BC-被-0002", name: "被套（标准白色）", status: "在库" as LinenStatus, matched: true },
  { rfid: "RFID00000003", code: "BC-枕-0003", name: "枕套（标准白色）", status: "在用" as LinenStatus, matched: false },
  { rfid: "RFID00000004", code: "BC-浴-0004", name: "浴巾（标准白色）", status: "在库" as LinenStatus, matched: true },
  { rfid: "RFID00000005", code: "BC-面-0005", name: "面巾（标准白色）", status: "在库" as LinenStatus, matched: true },
  { rfid: "RFID_UNKNOWN_01", code: "-", name: "未识别", status: "在库" as LinenStatus, matched: false },
  { rfid: "RFID00000006", code: "BC-地-0006", name: "地巾（标准白色）", status: "清洗中" as LinenStatus, matched: false },
  { rfid: "RFID00000007", code: "BC-浴-0007", name: "浴袍（标准白色）", status: "在库" as LinenStatus, matched: true },
];

// ===== 系统设置 - 品类管理 =====
export const linenCategories = [
  { id: "C001", name: "大床单", spec: "280x250cm", material: "60支纯棉", maxWash: 200, safetyStock: 100, unitPrice: 85 },
  { id: "C002", name: "小床单", spec: "200x150cm", material: "60支纯棉", maxWash: 200, safetyStock: 80, unitPrice: 65 },
  { id: "C003", name: "被套", spec: "240x220cm", material: "60支纯棉", maxWash: 180, safetyStock: 200, unitPrice: 120 },
  { id: "C004", name: "枕套", spec: "74x48cm", material: "60支纯棉", maxWash: 200, safetyStock: 150, unitPrice: 25 },
  { id: "C005", name: "浴巾", spec: "140x70cm", material: "长绒棉", maxWash: 150, safetyStock: 100, unitPrice: 45 },
  { id: "C006", name: "面巾", spec: "75x35cm", material: "长绒棉", maxWash: 150, safetyStock: 200, unitPrice: 15 },
  { id: "C007", name: "地巾", spec: "80x50cm", material: "纯棉加厚", maxWash: 120, safetyStock: 80, unitPrice: 35 },
  { id: "C008", name: "浴袍", spec: "均码", material: "纯棉毛圈", maxWash: 100, safetyStock: 50, unitPrice: 180 },
  { id: "C009", name: "桌布", spec: "180x180cm", material: "涤棉混纺", maxWash: 200, safetyStock: 60, unitPrice: 55 },
];

// ===== 仓库管理 =====
export const warehouses = [
  { id: "W001", name: "主仓库A区", location: "B1层东侧", capacity: 5000, used: 3450, manager: "张明" },
  { id: "W002", name: "主仓库B区", location: "B1层西侧", capacity: 3000, used: 2180, manager: "张明" },
  { id: "W003", name: "2F备品间", location: "2楼走廊尽头", capacity: 200, used: 156, manager: "李华" },
  { id: "W004", name: "3F备品间", location: "3楼走廊尽头", capacity: 200, used: 142, manager: "李华" },
  { id: "W005", name: "5F备品间", location: "5楼走廊尽头", capacity: 250, used: 198, manager: "王芳" },
  { id: "W006", name: "洗涤中心暂存", location: "工业园区A座", capacity: 1000, used: 620, manager: "赵经理" },
];

// ===== 洗涤统计 =====
export const laundryStats = {
  todayBatches: 5,
  todayCount: 1286,
  avgTurnaround: 18.5, // 小时
  monthlyTotal: 30500,
  avgPassRate: 96.8,
  topIssue: "褪色",
};

export const laundryTrend = [
  { date: "03/23", count: 1050, passRate: 97.2 },
  { date: "03/24", count: 1180, passRate: 96.5 },
  { date: "03/25", count: 980, passRate: 98.1 },
  { date: "03/26", count: 1320, passRate: 95.8 },
  { date: "03/27", count: 1150, passRate: 97.0 },
  { date: "03/28", count: 1280, passRate: 96.3 },
  { date: "03/29", count: 1286, passRate: 96.8 },
];
