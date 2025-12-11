-- 奶牛溯源系统SQLite数据库初始化脚本
-- 数据库文件: data/milk_trace.db

-- 1. 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT NOT NULL,
  `gender` TEXT NOT NULL,
  `phone` TEXT NOT NULL UNIQUE,
  `create_time` TEXT NOT NULL,
  `update_time` TEXT NOT NULL
);

CREATE INDEX `idx_phone` ON `user`(`phone`);

-- 2. 产品表
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL UNIQUE,
  `product_name` TEXT NOT NULL,
  `product_img` TEXT,
  `province` TEXT,
  `city` TEXT,
  `description` TEXT,
  `create_time` TEXT NOT NULL,
  `update_time` TEXT NOT NULL
);

CREATE INDEX `idx_province` ON `product`(`province`);
CREATE INDEX `idx_product_name` ON `product`(`product_name`);

-- 3. 物流信息表
DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL,
  `company_name` TEXT NOT NULL,
  `origin_address` TEXT NOT NULL,
  `destination_address` TEXT NOT NULL,
  `contact_phone` TEXT,
  `driver_name` TEXT,
  `driver_phone` TEXT,
  `vehicle_number` TEXT,
  `status` TEXT DEFAULT 'in_transit',
  `create_time` TEXT NOT NULL,
  `update_time` TEXT NOT NULL
);

CREATE INDEX `idx_product_code_logistics` ON `logistics`(`product_code`);

-- 4. 物流轨迹表
DROP TABLE IF EXISTS `logistics_track`;
CREATE TABLE `logistics_track` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL,
  `track_type` TEXT NOT NULL,
  `location` TEXT,
  `driver_name` TEXT,
  `vehicle_number` TEXT,
  `track_time` TEXT NOT NULL,
  `status` TEXT,
  `remark` TEXT,
  `create_time` TEXT NOT NULL
);

CREATE INDEX `idx_product_code_track` ON `logistics_track`(`product_code`);
CREATE INDEX `idx_track_time` ON `logistics_track`(`track_time`);

-- 5. 加工厂信息表
DROP TABLE IF EXISTS `processing`;
CREATE TABLE `processing` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL,
  `factory_name` TEXT NOT NULL,
  `factory_address` TEXT NOT NULL,
  `contact_phone` TEXT,
  `create_time` TEXT NOT NULL,
  `update_time` TEXT NOT NULL
);

CREATE INDEX `idx_product_code_processing` ON `processing`(`product_code`);

-- 6. 加工流程表
DROP TABLE IF EXISTS `processing_process`;
CREATE TABLE `processing_process` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL,
  `process_type` TEXT NOT NULL,
  `process_name` TEXT NOT NULL,
  `process_desc` TEXT,
  `staff_name` TEXT,
  `staff_role` TEXT,
  `vehicle_number` TEXT,
  `process_time` TEXT NOT NULL,
  `status` TEXT,
  `remark` TEXT,
  `create_time` TEXT NOT NULL
);

CREATE INDEX `idx_product_code_process` ON `processing_process`(`product_code`);
CREATE INDEX `idx_process_time` ON `processing_process`(`process_time`);

-- 7. 超市信息表
DROP TABLE IF EXISTS `supermarket`;
CREATE TABLE `supermarket` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL,
  `supermarket_name` TEXT NOT NULL,
  `supermarket_address` TEXT NOT NULL,
  `contact_phone` TEXT,
  `create_time` TEXT NOT NULL,
  `update_time` TEXT NOT NULL
);

CREATE INDEX `idx_product_code_supermarket` ON `supermarket`(`product_code`);

-- 8. 超市流程表
DROP TABLE IF EXISTS `supermarket_process`;
CREATE TABLE `supermarket_process` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `product_code` TEXT NOT NULL,
  `process_type` TEXT NOT NULL,
  `process_name` TEXT NOT NULL,
  `staff_name` TEXT,
  `staff_role` TEXT,
  `process_time` TEXT NOT NULL,
  `status` TEXT,
  `remark` TEXT,
  `create_time` TEXT NOT NULL
);

CREATE INDEX `idx_product_code_supermarket_process` ON `supermarket_process`(`product_code`);
CREATE INDEX `idx_supermarket_process_time` ON `supermarket_process`(`process_time`);

-- 插入示例数据

-- 插入示例产品
INSERT INTO `product` (`product_code`, `product_name`, `product_img`, `province`, `city`, `description`, `create_time`, `update_time`) VALUES
('985184y987n51225487d5', '牦牛牛奶', '/img/1.jpg', '四川', '成都', '优质牦牛牛奶，产自四川高原', datetime('now'), datetime('now')),
('985184y987n51225487d6', '牦牛牛奶', '/img/2.jpg', '四川', '成都', '优质牦牛牛奶，产自四川高原', datetime('now'), datetime('now')),
('985184y987n51225487d7', '有机牛奶', '/img/3.jpg', '内蒙古', '呼和浩特', '有机认证牛奶，天然无污染', datetime('now'), datetime('now')),
('985184y987n51225487d8', '高原牛奶', '/img/4.jpg', '青海', '西宁', '高原特色牛奶，营养丰富', datetime('now'), datetime('now'));

-- 插入示例物流信息
INSERT INTO `logistics` (`product_code`, `company_name`, `origin_address`, `destination_address`, `contact_phone`, `driver_name`, `driver_phone`, `vehicle_number`, `status`, `create_time`, `update_time`) VALUES
('985184y987n51225487d5', '西安德运物流有限公司', '山东省菏泽市鄄城县东祥路3号', '陕西省西安市碑林区南关正街50号中贸广场', '13802978945', '王**', '13802978945', '陕AG***3D53', 'arrived', datetime('now'), datetime('now'));

-- 插入示例物流轨迹
INSERT INTO `logistics_track` (`product_code`, `track_type`, `location`, `driver_name`, `vehicle_number`, `track_time`, `status`, `remark`, `create_time`) VALUES
('985184y987n51225487d5', 'arrival', '西安市碑林区南关正街50号中贸广场', NULL, NULL, '2022-01-23 23:31:00', '√ 中途无意外', NULL, datetime('now')),
('985184y987n51225487d5', 'transit', NULL, '王**', '陕AG***3D53', '2022-01-23 15:00:00', '√ 人员正常 车况正常', '司机：王** 卫', datetime('now')),
('985184y987n51225487d5', 'departure', '山东省菏泽市鄄城县东祥路3号', NULL, NULL, '2022-01-23 10:02:00', '√ 验码合格', NULL, datetime('now'));

-- 插入示例加工厂信息
INSERT INTO `processing` (`product_code`, `factory_name`, `factory_address`, `contact_phone`, `create_time`, `update_time`) VALUES
('985184y987n51225487d5', '鄄城县蔬菜加工基地', '山东省菏泽市鄄城县东祥路3号', '18178945324', datetime('now'), datetime('now'));

-- 插入示例加工流程
INSERT INTO `processing_process` (`product_code`, `process_type`, `process_name`, `process_desc`, `staff_name`, `staff_role`, `vehicle_number`, `process_time`, `status`, `remark`, `create_time`) VALUES
('985184y987n51225487d5', 'storage_out', '出库', NULL, '王**', '库管', NULL, '2022-01-23 08:44:00', '√ 验码合格', NULL, datetime('now')),
('985184y987n51225487d5', 'storage_in', '入库', NULL, '王**', '库管', NULL, '2022-01-23 08:01:00', '√ 验码合格', NULL, datetime('now')),
('985184y987n51225487d5', 'quality_check', '质量检测', NULL, '张**', '质检员', NULL, '2022-01-23 08:00:00', '√ 验码合格 质检合格', NULL, datetime('now')),
('985184y987n51225487d5', 'processing', '加工 包装', '除杆, 清洗, 封膜包装', '张*', '工人', NULL, '2022-01-23 07:19:00', '√ 验码合格 人员正常 设备正常', NULL, datetime('now')),
('985184y987n51225487d5', 'storage_in', '入库', NULL, '张*', '工人', NULL, '2022-01-23 08:15:00', '√ 验码合格', NULL, datetime('now')),
('985184y987n51225487d5', 'transport', '运输', NULL, '王**', '司机', '鲁P23***2D2', '2022-01-23 06:42:00', '√ 验码合格 人员正常 车况正常', NULL, datetime('now'));

-- 插入示例超市信息
INSERT INTO `supermarket` (`product_code`, `supermarket_name`, `supermarket_address`, `contact_phone`, `create_time`, `update_time`) VALUES
('985184y987n51225487d5', '永辉超市(中贸广场购物楼店)', '西安市碑林区南关正街50号中贸广场购物楼B1', '029-87457425', datetime('now'), datetime('now'));

-- 插入示例超市流程
INSERT INTO `supermarket_process` (`product_code`, `process_type`, `process_name`, `staff_name`, `staff_role`, `process_time`, `status`, `remark`, `create_time`) VALUES
('985184y987n51225487d5', 'storage_out', '出库', '刘**', '营业员', '2022-01-24 06:42:00', '√ 验码合格', NULL, datetime('now')),
('985184y987n51225487d5', 'storage_in', '入库', '马*', '库管', '2022-01-24 00:05:00', '√ 验码合格', NULL, datetime('now'));
