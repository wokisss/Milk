import React, { useEffect, useState, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { api } from '../services/api';
import { Herdsman } from '../types';
import Modal from '../components/Modal';

type HerdsmanFormData = Omit<Herdsman, 'id'>;

const emptyHerdsman: HerdsmanFormData = {
  id_card: '',
  name: '',
  contact: '',
  address: '',
};

const HerdsmanList: React.FC = () => {
  const [herdsmen, setHerdsmen] = useState<Herdsman[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  
  const [editingHerdsman, setEditingHerdsman] = useState<Partial<Herdsman> | null>(null);
  
  const fetchData = useCallback(async (search: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHerdsmen(search);
      setHerdsmen(data);
    } catch (err) {
      setError('数据加载失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchData]);

  const openCreateModal = () => {
    setEditingHerdsman(emptyHerdsman);
    setIsModalOpen(true);
  };

  const openEditModal = (herdsman: Herdsman) => {
    setEditingHerdsman(herdsman);
    setIsModalOpen(true);
  };

  const openViewModal = (herdsman: Herdsman) => {
    setEditingHerdsman(herdsman);
    setViewModalOpen(true);
  };
  
  const openDeleteModal = (herdsman: Herdsman) => {
    setEditingHerdsman(herdsman);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewModalOpen(false)
    setEditingHerdsman(null);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingHerdsman) {
      setEditingHerdsman({
        ...editingHerdsman,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (!editingHerdsman) return;

    const formData: HerdsmanFormData = {
      name: editingHerdsman.name || '',
      id_card: editingHerdsman.id_card || '',
      contact: editingHerdsman.contact || '',
      address: editingHerdsman.address || '',
    };
    
    if (!formData.name || !formData.id_card || !formData.contact || !formData.address) {
        alert("所有字段均为必填项。");
        return;
    }

    setLoading(true);
    try {
      if ('id' in editingHerdsman && editingHerdsman.id) {
        await api.updateHerdsman(editingHerdsman.id, formData);
      } else {
        await api.createHerdsman(formData);
      }
      closeModal();
      fetchData(debouncedSearchTerm);
    } catch (err) {
        alert(`保存失败: ${'请检查输入或网络连接。'}`);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (editingHerdsman && 'id' in editingHerdsman) {
      setLoading(true);
      try {
        await api.deleteHerdsman(editingHerdsman.id!);
        setDeleteModalOpen(false);
        setEditingHerdsman(null);
        fetchData(debouncedSearchTerm);
      } catch (err) {
        alert('删除失败，请稍后重试。');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">牧民信息</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="请输入牧民信息"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-64 text-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-blue-700 transition flex items-center">
            查找牧民
          </button>
        </div>
        <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition flex items-center">
          <i className="fas fa-plus mr-2"></i>
          新增牧民
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 text-sm">
              <th className="px-6 py-3 font-semibold">编号</th>
              <th className="px-6 py-3 font-semibold">身份证号</th>
              <th className="px-6 py-3 font-semibold">姓名</th>
              <th className="px-6 py-3 font-semibold">联系方式</th>
              <th className="px-6 py-3 font-semibold">家庭住址</th>
              <th className="px-6 py-3 font-semibold text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10">加载中...</td></tr>
            ) : error ? (
              <tr><td colSpan={6} className="text-center py-10 text-red-500">{error}</td></tr>
            ) : herdsmen.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10">未找到任何牧民信息。</td></tr>
            ) : (
              herdsmen.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.id_card}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.address}</td>
                  <td className="px-6 py-4 text-sm text-center space-x-4">
                    <button onClick={() => openEditModal(item)} className="text-blue-600 hover:underline">编辑</button>
                    <button onClick={() => openViewModal(item)} className="text-blue-600 hover:underline">查看</button>
                    <button onClick={() => openDeleteModal(item)} className="text-red-600 hover:underline">删除</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Simple Pagination Placeholder */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          共 {herdsmen.length} 条记录
        </div>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 border rounded text-sm">&lt;</button>
          <button className="px-3 py-1 border rounded text-sm bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 border rounded text-sm">&gt;</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingHerdsman && 'id' in editingHerdsman ? '修改牧民信息' : '新增牧民'}
        footer={
          <>
            <button onClick={closeModal} className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100 text-sm">取消</button>
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm" disabled={loading}>
              {loading ? '保存中...' : '保存'}
            </button>
          </>
        }
      >
        {editingHerdsman && (
          <form className="space-y-4 pt-4">
             <div className="grid grid-cols-1 gap-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">*身份证号:</label>
                    <input name="id_card" value={editingHerdsman.id_card || ''} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">*姓名:</label>
                    <input name="name" value={editingHerdsman.name || ''} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">*联系方式:</label>
                    <input name="contact" value={editingHerdsman.contact || ''} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">*家庭住址:</label>
                    <input name="address" value={editingHerdsman.address || ''} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
             </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={closeModal}
        title="查看牧民信息"
        footer={
          <button onClick={closeModal} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">关闭</button>
        }
      >
        {editingHerdsman && (
          <div className="space-y-3 pt-4 text-sm">
            <p><strong className="font-semibold text-gray-600 w-24 inline-block">身份证号:</strong> {editingHerdsman.id_card}</p>
            <p><strong className="font-semibold text-gray-600 w-24 inline-block">姓名:</strong> {editingHerdsman.name}</p>
            <p><strong className="font-semibold text-gray-600 w-24 inline-block">联系方式:</strong> {editingHerdsman.contact}</p>
            <p><strong className="font-semibold text-gray-600 w-24 inline-block">家庭住址:</strong> {editingHerdsman.address}</p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="确认删除"
        width="max-w-sm"
        footer={
          <>
            <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 text-sm">不，取消</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm ml-2" disabled={loading}>
              {loading ? '删除中...' : '是的，删除'}
            </button>
          </>
        }
      >
        <div className="flex items-start space-x-3 pt-2">
            <div className="bg-red-100 p-2 rounded-full mt-1">
                <i className="fas fa-exclamation-triangle text-red-500 text-lg"></i>
            </div>
            <p className="text-gray-700">确定要删除牧民 <strong>"{editingHerdsman?.name}"</strong> 的信息吗？此操作无法撤销。</p>
        </div>
      </Modal>
    </div>
  );
};

export default HerdsmanList;