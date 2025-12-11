import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

// Mock profile data structure based on the PDF
interface ProfileData {
  name: string;
  wechat: string;
  phone: string;
  qq: string;
  email: string;
}

const Profile: React.FC = () => {
  const { username } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    wechat: '',
    phone: '',
    qq: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the user's profile data
    // For now, we'll just populate it with some mock data
    setLoading(true);
    // Assuming the username from auth is the 'name' in the profile
    setProfile({
      name: username || '郝大星',
      wechat: 'wx_123456',
      phone: '1889090099',
      qq: '123456789',
      email: 'hdx@example.com',
    });
    setLoading(false);
  }, [username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Mock API call
      console.log('Saving profile:', profile);
      // await api.updateProfile(username, profile); 
      alert('个人信息更新成功！');
    } catch (error) {
      alert('更新失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.name) {
    return <div className="p-8">加载中...</div>;
  }

  return (
    <div className="p-8 bg-white h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">个人中心</h1>
      
      <div className="max-w-3xl mx-auto border border-gray-200 rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">个人信息</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 text-right">姓名*</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full max-w-sm border-gray-300 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50" readOnly />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 text-right">微信</label>
            <input type="text" name="wechat" value={profile.wechat} onChange={handleChange} placeholder="请输入" className="w-full max-w-sm border-gray-300 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 text-right">电话</label>
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="请输入" className="w-full max-w-sm border-gray-300 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 text-right">QQ</label>
            <input type="text" name="qq" value={profile.qq} onChange={handleChange} placeholder="请输入" className="w-full max-w-sm border-gray-300 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 text-right">邮箱</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="请输入" className="w-full max-w-sm border-gray-300 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="pt-4 md:ml-[116px]">
            <button onClick={handleSave} className="px-10 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold text-sm" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

