import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  bgColor: string;
  index: number;
}

interface StatsData {
  total_sales: number;
  total_expenses: number;
  net_profit: number;
  due_amount: number;
  payment_received: number;
}

interface PreviousStatsData {
  total_sales: number;
  total_expenses: number;
  net_profit: number;
  due_amount: number;
  payment_received: number;
}

const calculateChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? '+100%' : '-100%'; // Prevent division by zero
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
};

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, bgColor }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-sm transition-all duration-300 hover:scale-105`}>
      <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        <div className="flex flex-col items-end">
          <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {change}
            {isPositive ? (
              <ArrowUpCircle className="h-4 w-4 ml-1" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 ml-1" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Stats: React.FC<{ data: StatsData; previousData: PreviousStatsData }> = ({
  data,
  previousData,
}) => {
  const stats = [
    {
      title: 'Total Sales',
      value: data.total_sales.toString(),
      change: calculateChange(data.total_sales, previousData.total_sales),
      bgColor: 'bg-[#D9F2FB]',
      index: 0,
    },
    {
      title: 'Total Expenses',
      value: data.total_expenses.toString(),
      change: calculateChange(data.total_expenses, previousData.total_expenses),
      bgColor: 'bg-[#E2E5EA]',
      index: 1,
    },
    {
      title: 'Net Profit',
      value: data.net_profit.toString(),
      change: calculateChange(data.net_profit, previousData.net_profit),
      bgColor: 'bg-[#D9F2FB]',
      index: 2,
    },
    {
      title: 'Due Amount',
      value: data.due_amount.toString(),
      change: calculateChange(data.due_amount, previousData.due_amount),
      bgColor: 'bg-[#E2E5EA]',
      index: 3,
    },
    {
      title: 'Payment Received',
      value: data.payment_received.toString(),
      change: calculateChange(data.payment_received, previousData.payment_received),
      bgColor: 'bg-[#D9F2FB]',
      index: 4,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatsCard
          key={stat.index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};
