"use client";

import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getOrders } from "@/api/orderApi";

interface OrderItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: string;
  userId: string;
  companyId: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Siparişler alınamadı:", error);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Siparişler</h1>
        <p className="mt-1 text-sm text-gray-500">
          Geçmiş siparişlerinizi görüntüleyin.
        </p>
      </div>
      <TableContainer
        component={Paper}
        elevation={0}
        className="overflow-hidden rounded-xl border border-gray-200"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell sx={{ fontWeight: 600 }}>Sipariş No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Ürünler</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Toplam</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tarih</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="py-10">
                  <p className="text-gray-500">Henüz siparişiniz bulunmuyor.</p>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <span className="font-medium text-slate-800">
                      {order.id.substring(0, 8)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id}>
                          <span className="font-medium">
                            {item.productName}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-800">
                      {order.totalPrice.toLocaleString("tr-TR")} ₺
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
