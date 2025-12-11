import React, { useState } from 'react';
import { api } from '../services/api';
import { AnnouncementCreate } from '../types';

const Announcement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'公开' | '不公开'>('公开');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      alert('标题和内容不能为空');
      return;
    }

    setLoading(true);
    try {
      // Note: The API doesn't seem to support all these fields.
      // This is a mock implementation of what the frontend form would do.
      const announcementData: AnnouncementCreate = {
        title,
        content,
        date: new Date().toISOString().split('T')[0],
        // sort_order: parseInt(sortOrder), 
        // image_url: '', // would be set after uploading image
        // status: status,
      };
      await api.createAnnouncement(announcementData);
      alert('公告发布成功！');
      // Reset form
      setTitle('');
      setSortOrder('');
      setImage(null);
      setContent('');
      setStatus('公开');
    } catch (error) {
      alert('发布失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Simply reset the form state
    setTitle('');
    setSortOrder('');
    setImage(null);
    setContent('');
    setStatus('公开');
  };

  return (
    <div className="p-8 bg-white h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">发布公告</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 text-right">*公告标题:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 text-right">*公告排序:</label>
            <input type="text" value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-4">
            <label className="text-sm font-semibold text-gray-700 text-right pt-2">*公告轮播图:</label>
            <div>
              <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                {image ? <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-md"/> : '点击上传'}
              </div>
              <input type="file" onChange={handleImageChange} className="mt-2 text-sm" accept="image/*" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-4">
            <label className="text-sm font-semibold text-gray-700 text-right pt-2">*公告内容:</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 text-right">*状态:</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input type="radio" name="status" value="公开" checked={status === '公开'} onChange={() => setStatus('公开')} className="form-radio text-blue-600"/>
                <span className="ml-2 text-sm text-gray-700">公开</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="status" value="不公开" checked={status === '不公开'} onChange={() => setStatus('不公开')} className="form-radio text-blue-600"/>
                <span className="ml-2 text-sm text-gray-700">不公开</span>
              </label>
            </div>
          </div>
          
          <div className="pt-4 flex justify-center space-x-4 md:ml-[136px]">
            <button onClick={handleCancel} className="px-8 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-semibold">取消</button>
            <button onClick={handlePublish} className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold" disabled={loading}>
              {loading ? '发布中...' : '发布'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;

