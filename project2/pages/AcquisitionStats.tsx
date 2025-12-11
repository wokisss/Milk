import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { Acquisition, AcquisitionCreate, Stats } from '../types';
import Modal from '../components/Modal';

const AcquisitionStats: React.FC = () => {
  const [data, setData] = useState<Acquisition[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Acquisition | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const acquisitions = await api.getAcquisitions();
      const statsData = await api.getStats();
      setData(acquisitions);
      setStats(statsData);
    } catch (err) {
      setError('数据加载失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openViewModal = (item: Acquisition) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const openDeleteModal = (item: Acquisition) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      setLoading(true);
      try {
        await api.deleteAcquisition(selectedItem.id);
        closeModal();
        fetchData();
      } catch (err) {
        alert('删除失败，请稍后重试。');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">收购统计信息</h1>
      
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm mb-1">管理向积</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats.date}</h3>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm mb-1">当日收购量</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats.daily_weight}</h3>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm mb-1">总收购量</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats.total_weight}</h3>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 text-sm">
              <th className="px-6 py-3 font-semibold">收购记录编号</th>
              <th className="px-6 py-3 font-semibold">牧民身份证号</th>
              <th className="px-6 py-3 font-semibold">奶站编号</th>
              <th className="px-6 py-3 font-semibold">鲜奶重量</th>
              <th className="px-6 py-3 font-semibold">收购单价</th>
              <th className="px-6 py-3 font-semibold">收购时间</th>
              <th className="px-6 py-3 font-semibold text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-10">加载中...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} className="text-center py-10 text-red-500">数据加载失败，请稍后重试。</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-10">未找到任何收购信息。</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.herdsman_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.initial_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.weight}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-center space-x-4">
                    <button onClick={() => openViewModal(item)} className="text-blue-600 hover:underline">查看</button>
                    <button onClick={() => openDeleteModal(item)} className="text-red-600 hover:underline">删除</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          共 {data.length} 条记录
        </div>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 border rounded text-sm">&lt;</button>
          <button className="px-3 py-1 border rounded text-sm bg-blue-500 text-white">1</button>
          <button className="px-3 py-1 border rounded text-sm">&gt;</button>
        </div>
      </div>

      <Modal
        isOpen={isViewModalOpen}
        onClose={closeModal}
        title="查看统计信息"
        footer={<button onClick={closeModal} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">关闭</button>}
      >
        {selectedItem && (
          <div className="space-y-3 pt-4 text-sm">
            <p><strong className="font-semibold text-gray-600 w-32 inline-block">牧民身份证号:</strong> {selectedItem.herdsman_id}</p>
            <p><strong className="font-semibold text-gray-600 w-32 inline-block">奶站编号:</strong> {selectedItem.initial_id}</p>
            <p><strong className="font-semibold text-gray-600 w-32 inline-block">鲜奶重量:</strong> {selectedItem.weight}</p>
            <p><strong className="font-semibold text-gray-600 w-32 inline-block">收购单价:</strong> {selectedItem.price}</p>
            <p><strong className="font-semibold text-gray-600 w-32 inline-block">收购时间:</strong> {selectedItem.date}</p>
            <p><strong className="font-semibold text-gray-600 w-32 inline-block">收购地点:</strong> {selectedItem.location}</p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        title="确认删除"
        width="max-w-sm"
        footer={
          <>
            <button onClick={closeModal} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 text-sm">不，取消</button>
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
            <p className="text-gray-700">确定要删除此条收购记录吗？此操作无法撤销。</p>
        </div>
      </Modal>
    </div>
  );
};

export default AcquisitionStats;

