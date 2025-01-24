import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '@/services/admin';

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchDashboardStats();
      setStats(data);
    };
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Sales', value: `$${stats.totalSales.toLocaleString()}` },
        { label: 'Total Orders', value: stats.totalOrders },
        { label: 'Avg. Order Value', value: `$${stats.averageOrderValue}` },
        { label: 'Active Users', value: stats.activeUsers },
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-sm text-gray-500 mb-2">{stat.label}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
} 