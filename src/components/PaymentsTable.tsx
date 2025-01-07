import React from 'react';

interface SupplierPayment {
  record_no: number;
  farmer_name: string;
  net_amount: string;
  paid_amount: string;
  due_amount: number;
  payment_status: string;
}

interface CustomerPayment {
  record_no: number;
  customer_name: string;
  payment_date: string;
  paid_amount: string;
  voucher_no: number;
  payment_mode: string;
}

interface PaymentsTableProps {
  title: string;
  type: 'supplier' | 'customer';
  payments: SupplierPayment[] | CustomerPayment[];
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({ title, type, payments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {type === 'supplier' ? (
                <>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Record No
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Amount
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid Amount
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Amount
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </>
              ) : (
                <>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Record No
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid Amount
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voucher No
                  </th>
                  <th className="px-4 py-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Mode
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {type === 'supplier'
              ? (payments as SupplierPayment[]).map((payment) => (
                  <tr key={payment.record_no}>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">#{payment.record_no}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">{payment.farmer_name}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">${payment.net_amount}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">${payment.paid_amount}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">${payment.due_amount.toFixed(2)}</td>
                    <td className="px-4 py-2 sm:px-6">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.payment_status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : payment.payment_status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                  </tr>
                ))
              : (payments as CustomerPayment[]).map((payment) => (
                  <tr key={payment.record_no}>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">#{payment.record_no}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">{payment.customer_name}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">{payment.payment_date}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">${payment.paid_amount}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">{payment.voucher_no}</td>
                    <td className="px-4 py-2 sm:px-6 text-sm text-gray-900">{payment.payment_mode}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
