import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useRecoilState } from "recoil";
import { paymentsState } from "../Atom/Payment";

const PaymentTable = () => {
  const [payments, setPayments] = useRecoilState(paymentsState);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(data); // updates recoil state
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();

    // 🔁 Auto-refresh every 10s (simulate realtime without reload)
    // const interval = setInterval(fetchPayments, 10000);
    // return () => clearInterval(interval);
  }, []);

  const columns = [
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`px-2 py-1 rounded-full text-white font-semibold ${
            row.status === "issued"
              ? "bg-green-500"
              : row.status === "initiated"
              ? "bg-yellow-500"
              : row.status === "expired"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Unique ID", selector: row => row.uniqueId, sortable: true },
  ];

  const filteredPayments =
    statusFilter === "all"
      ? payments
      : payments.filter((p) => p.status === statusFilter);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Payments</h1>

      <div className="mb-4">
        <label className="text-white font-medium mr-3">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        >
          <option value="all">All</option>
          <option value="issued">Issued</option>
          <option value="initiated">Initiated</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredPayments}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default PaymentTable;
