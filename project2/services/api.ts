// 从类型定义文件导入数据结构
import {
  Herdsman, 
  HerdsmanCreate,
  Acquisition, 
  Stats, 
  Announcement,
  AnnouncementCreate,
  Profile 
} from '../types';

// --- 配置项 ---

// 控制开关：设置为 true 使用模拟数据，设置为 false 使用真实的 Python 后端
const USE_MOCK = false; 
// 后端 API 的基础 URL
const API_URL = 'http://localhost:8000/api';

// --- 模拟数据 (仅在 USE_MOCK = true 时使用) ---

// 模拟的牧民列表
let MOCK_HERDSMEN: Herdsman[] = Array.from({ length: 15 }).map((_, i) => ({
  id: 202501 + i,
  id_card: `51010${1000000000 + i}`,
  name: i % 2 === 0 ? "张三" : "李四",
  contact: `138${10000000 + i}`,
  address: "四川成都"
}));

// 模拟的收购记录列表
const MOCK_ACQUISITIONS: Acquisition[] = Array.from({ length: 15 }).map((_, i) => ({
  id: 202501 + i,
  herdsman_id_card: "123456789",
  initial_id: "12011251723",
  weight: "10kg",
  price: 20,
  total_price: 200,
  date: "2025.11.1",
  location: "四川成都"
}));

// 模拟的统计数据
const MOCK_STATS: Stats = {
  date: "2025.11.1",
  daily_weight: "40kg",
  total_weight: "150kg"
};

// 模拟的公告列表
let MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: "关于调整鲜奶收购价格的通知", content: "从下月起，A级鲜奶收购价格上调5%。", date: "2023-10-01" },
  { id: 2, title: "系统维护公告", content: "系统将于本周五晚22:00进行升级维护，预计持续2小时。", date: "2023-10-15" }
];

// 模拟的个人信息
let MOCK_PROFILE: Profile = {
  username: "admin",
  email: "admin@example.com",
  registration_date: "2023-01-01",
  permissions: ["查看数据", "编辑信息", "发布公告"]
};


// --- 辅助函数 ---
/**
 * 模拟网络延迟的函数
 * @param ms - 延迟的毫秒数
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API 方法集合 ---

/**
 * api 对象封装了所有与后端交互的请求。
 * 每个方法都根据 USE_MOCK 的值来决定是返回模拟数据还是发起真实的 HTTP 请求。
 */
export const api = {
  /**
   * 用户登录
   * @param username - 用户名
   * @param password - 密码
   * @returns 成功则返回包含 token 和用户名的对象
   */
  login: async (username: string, password: string) => {
    if (USE_MOCK) {
      await delay(500); // 模拟网络延迟
      if (username && password) return { token: "mock-token", username };
      throw new Error("Login failed");
    }
    // 发起真实的 POST 请求
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  /**
   * 获取牧民信息列表
   * @param search - (可选) 搜索关键词
   * @returns 牧民信息数组
   */
  getHerdsmen: async (search?: string): Promise<Herdsman[]> => {
    if (USE_MOCK) {
      await delay(300);
      if (search) {
        return MOCK_HERDSMEN.filter(h => h.name.includes(search) || h.id_card.includes(search));
      }
      return [...MOCK_HERDSMEN];
    }
    const url = search ? `${API_URL}/herdsmen?search=${search}` : `${API_URL}/herdsmen`;
    const res = await fetch(url);
    return res.json();
  },

  /**
   * 创建一个新的牧民
   * @param herdsmanData - 新牧民的数据
   * @returns 创建成功后的牧民对象
   */
  createHerdsman: async (herdsmanData: HerdsmanCreate): Promise<Herdsman> => {
    if (USE_MOCK) {
      await delay(300);
      const newHerdsman: Herdsman = {
        id: Math.max(...MOCK_HERDSMEN.map(h => h.id)) + 1,
        ...herdsmanData
      };
      MOCK_HERDSMEN.push(newHerdsman);
      return newHerdsman;
    }
    const res = await fetch(`${API_URL}/herdsmen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(herdsmanData)
    });
    return res.json();
  },

  /**
   * 更新一个已存在的牧民信息
   * @param id - 要更新的牧民 ID
   * @param herdsmanData - 新的牧民数据
   * @returns 更新成功后的牧民对象
   */
  updateHerdsman: async (id: number, herdsmanData: HerdsmanCreate): Promise<Herdsman> => {
    if (USE_MOCK) {
      await delay(300);
      const index = MOCK_HERDSMEN.findIndex(h => h.id === id);
      if (index !== -1) {
        MOCK_HERDSMEN[index] = { ...MOCK_HERDSMEN[index], ...herdsmanData };
        return MOCK_HERDSMEN[index];
      }
      throw new Error("Herdsman not found");
    }
    const res = await fetch(`${API_URL}/herdsmen/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(herdsmanData)
    });
    return res.json();
  },

  /**
   * 根据 ID 删除一个牧民
   * @param id - 要删除的牧民的 ID
   * @returns 操作成功则返回 true
   */
  deleteHerdsman: async (id: number) => {
    if (USE_MOCK) {
      await delay(300);
      MOCK_HERDSMEN = MOCK_HERDSMEN.filter(h => h.id !== id);
      return true; // 模拟删除成功
    }
    await fetch(`${API_URL}/herdsmen/${id}`, { method: 'DELETE' });
    return true;
  },

  /**
   * 获取所有收购记录列表
   * @returns 收购记录数组
   */
  getAcquisitions: async (): Promise<Acquisition[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...MOCK_ACQUISITIONS];
    }
    const res = await fetch(`${API_URL}/acquisitions/`);
    return res.json();
  },

  /**
   * 创建一个新的收购记录
   * @param acquisitionData - 新收购记录的数据
   * @returns 创建成功后的收购记录对象
   */
  createAcquisition: async (acquisitionData: AcquisitionCreate): Promise<Acquisition> => {
    const res = await fetch(`${API_URL}/acquisitions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acquisitionData)
    });
    return res.json();
  },

  /**
   * 更新一个已存在的收购记录信息
   * @param id - 要更新的收购记录 ID
   * @param acquisitionData - 新的收购记录数据
   * @returns 更新成功后的收购记录对象
   */
  updateAcquisition: async (id: number, acquisitionData: AcquisitionCreate): Promise<Acquisition> => {
    const res = await fetch(`${API_URL}/acquisitions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acquisitionData)
    });
    return res.json();
  },

  /**
   * 根据 ID 删除一个收购记录
   * @param id - 要删除的收购记录的 ID
   * @returns 操作成功则返回 true
   */
  deleteAcquisition: async (id: number) => {
    await fetch(`${API_URL}/acquisitions/${id}`, { method: 'DELETE' });
    return true;
  },

  /**
   * 获取统计数据
   * @returns 统计数据对象
   */
  getStats: async (): Promise<Stats> => {
    if (USE_MOCK) return MOCK_STATS;
    const res = await fetch(`${API_URL}/stats`);
    return res.json();
  },

  /**
   * 获取所有公告
   * @returns 公告列表
   */
  getAnnouncements: async (): Promise<Announcement[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...MOCK_ANNOUNCEMENTS];
    }
    const res = await fetch(`${API_URL}/announcements`);
    return res.json();
  },

  /**
   * 创建一个新公告
   * @param announcementData - 新公告的数据
   * @returns 创建成功后的公告对象
   */
  createAnnouncement: async (announcementData: AnnouncementCreate): Promise<Announcement> => {
    if (USE_MOCK) {
      await delay(300);
      const newAnnouncement: Announcement = {
        id: Math.max(...MOCK_ANNOUNCEMENTS.map(a => a.id)) + 1,
        ...announcementData,
        date: new Date().toISOString().split('T')[0]
      };
      MOCK_ANNOUNCEMENTS.unshift(newAnnouncement);
      return newAnnouncement;
    }
    const res = await fetch(`${API_URL}/announcements/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcementData)
    });
    return res.json();
  },

  /**
   * 更新一个已存在的公告信息
   * @param id - 要更新的公告 ID
   * @param announcementData - 新的公告数据
   * @returns 更新成功后的公告对象
   */
  updateAnnouncement: async (id: number, announcementData: AnnouncementCreate): Promise<Announcement> => {
    if (USE_MOCK) {
      await delay(300);
      const index = MOCK_ANNOUNCEMENTS.findIndex(a => a.id === id);
      if (index !== -1) {
        MOCK_ANNOUNCEMENTS[index] = { ...MOCK_ANNOUNCEMENTS[index], ...announcementData };
        return MOCK_ANNOUNCEMENTS[index];
      }
      throw new Error("Announcement not found");
    }
    const res = await fetch(`${API_URL}/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcementData)
    });
    return res.json();
  },

  /**
   * 根据 ID 删除一个公告
   * @param id - 要删除的公告的 ID
   * @returns 操作成功则返回 true
   */
  deleteAnnouncement: async (id: number) => {
    if (USE_MOCK) {
      await delay(300);
      MOCK_ANNOUNCEMENTS = MOCK_ANNOUNCEMENTS.filter(a => a.id !== id);
      return true; // 模拟删除成功
    }
    await fetch(`${API_URL}/announcements/${id}`, { method: 'DELETE' });
    return true;
  },
  
  /**
   * 获取用户个人资料
   * @returns 个人资料对象
   */
  getProfile: async (username: string): Promise<Profile> => {
    if (USE_MOCK) {
      await delay(200);
      return MOCK_PROFILE;
    }
    const res = await fetch(`${API_URL}/profile/${username}`);
    return res.json();
  },

  /**
   * 更新用户个人资料
   * @param profileData - 新的个人资料
   * @returns 更新成功后的个人资料对象
   */
  updateProfile: async (username: string, profileData: Profile): Promise<Profile> => {
    if (USE_MOCK) {
      await delay(300);
      MOCK_PROFILE = { ...MOCK_PROFILE, ...profileData };
      return MOCK_PROFILE;
    }
    const res = await fetch(`${API_URL}/profile/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return res.json();
  }
};