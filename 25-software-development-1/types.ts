/**
 * 用户信息接口
 * 用于定义登录成功后返回的用户数据结构。
 */
export interface User {
  username: string; // 用户名
  token: string;    // 用于身份验证的令牌
}

/**
 * 牧民信息接口
 * 定义了牧民的基本信息结构。
 */
export interface Herdsman {
  id: number;       // 牧民的唯一标识符
  id_card: string;  // 身份证号码
  name: string;     // 姓名
  contact: string;  // 联系方式
  address: string;  // 家庭住址
}

/**
 * 创建新牧民时使用的数据类型
 * Omit<T, K> 是一个 TypeScript 内置工具类型，
 * 它会从类型 T 中移除指定的属性 K, 这里我们移除了 'id' 属性，
 * 因为在创建新记录时，ID 通常由后端自动生成。
 */
export type HerdsmanCreate = Omit<Herdsman, 'id'>;

/**
 * 收购记录接口
 * 定义了单次牛奶收购的详细记录。
 */
export interface Acquisition {
  id: number;                 // 收购记录的唯一标识符
  herdsman_id_card: string;   // 牧民的身份证号码，用于关联
  initial_id: string;         // 初始编号，可能是批次号或追溯码
  weight: string;             // 奶量/重量 (例如 "120.5 kg")
  price: number;              // 单价 (元/kg)
  total_price: number;        // 总价
  date: string;               // 收购日期 (例如 "2025-11-27")
  location: string;           // 收购地点
}

/**
 * 公告信息接口
 * 定义了发布的公告内容结构。
 */
export interface Announcement {
  id: number;      // 公告的唯一标识符
  title: string;    // 公告标题
  content: string;  // 公告的具体内容
  date: string;     // 发布日期
}
/**
 * 创建新公告时使用的数据类型
 */
export type AnnouncementCreate = Omit<Announcement, 'id' | 'date'>;


/**
 * 统计数据接口
 * 定义了用于展示在统计页面的数据结构。
 */
export interface Stats {
  date: string;         // 统计数据的日期
  daily_weight: string; // 当日总收购重量
  total_weight: string; // 累计总收购重量
}
/**
 * 用户个人资料接口
 * 定义了用户个人中心页面的数据结构。
 */
export interface Profile {
  username: string;          // 用户名
  email: string;             // 电子邮箱
  registration_date: string; // 注册日期
  permissions: string[];     // 拥有的权限列表
}
