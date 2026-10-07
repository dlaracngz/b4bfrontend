"use client";

import { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { getCart, updateCartItem, removeCartItem } from "@/api/cartApi";
import { createOrder } from "@/api/orderApi";

interface CartItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  stockQuantity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Sepet alınamadı:", error);
    }
  };

  useEffect(() => {
    const loadInitialCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error("Sepet alınamadı:", error);
      }
    };

    loadInitialCart();
  }, []);

  const handleQuantityChange = async (item: CartItem, quantity: number) => {
    if (quantity < 1 || quantity > item.stockQuantity) {
      return;
    }

    try {
      await updateCartItem(item.id, quantity);
      await loadCart();
    } catch (error) {
      console.error("Sepet güncellenemedi:", error);
    }
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      await removeCartItem(cartItemId);
      await loadCart();
    } catch (error) {
      console.error("Ürün silinemedi:", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder();

      alert("Sipariş başarıyla oluşturuldu.");

      await loadCart();
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error);
      alert("Sipariş oluşturulamadı.");
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-slate-800">Sepet</h1>

        <p className="mt-2 text-sm text-gray-500">Sepet yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Sepet</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sepetinizdeki ürünleri yönetin.
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
              <TableCell sx={{ fontWeight: 600 }}>Ürün</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Birim Fiyat</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Adet
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Stok
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Toplam</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                İşlem
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-10">
                  <p className="text-gray-500">Sepetiniz boş.</p>
                </TableCell>
              </TableRow>
            ) : (
              cart.items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-800">
                        {item.productName}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {item.productCode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.unitPrice.toLocaleString("tr-TR")} ₺
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-1">
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        sx={{
                          width: 30,
                          height: 30,
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <span className="w-8 text-center font-medium text-slate-800">
                        {item.quantity}
                      </span>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stockQuantity}
                        sx={{
                          width: 30,
                          height: 30,
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={
                        item.stockQuantity <= 0
                          ? "font-medium text-red-600"
                          : item.stockQuantity <= 5
                            ? "font-medium text-orange-500"
                            : "font-medium text-green-600"
                      }
                    >
                      {item.stockQuantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-800">
                      {item.totalPrice.toLocaleString("tr-TR")} ₺
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleRemove(item.id)}
                      sx={{
                        width: 32,
                        height: 32,
                        color: "#DC2626",
                        "&:hover": {
                          backgroundColor: "#FEE2E2",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {cart.items.length > 0 && (
        <div className="mt-6 flex items-center justify-end gap-4">
          {/* Genel toplam */}
          <div className="flex items-center gap-6 rounded-xl border border-gray-200 bg-white px-6 py-4">
            <span className="text-sm text-gray-500">Genel Toplam</span>

            <span className="text-xl font-bold text-slate-800">
              {cart.totalPrice.toLocaleString("tr-TR")} ₺
            </span>
          </div>

          {/* Sipariş oluştur */}
          <button
            type="button"
            onClick={handleCreateOrder}
            className="rounded-md bg-[#1E293B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#334155]"
          >
            Sipariş Oluştur
          </button>
        </div>
      )}
    </div>
  );
}
