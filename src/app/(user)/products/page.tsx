"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/productApi";

import { addToCart } from "@/api/cartApi";

interface Product {
  id: string;
  productCode: string;
  name: string;
  price: number;
  stockQuantity: number;
  criticalStockLevel: number;
  isActive: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  // =========================
  // EKLEME MODALI
  // =========================

  const [openAddModal, setOpenAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    productCode: "",
    name: "",
    price: "",
    stockQuantity: "",
    criticalStockLevel: "",
  });

  // =========================
  // GÜNCELLEME MODALI
  // =========================

  const [openEditModal, setOpenEditModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState({
    id: "",
    productCode: "",
    name: "",
    price: "",
    stockQuantity: "",
    criticalStockLevel: "",
    isActive: true,
  });

  // =========================
  // SİLME MODALI
  // =========================

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // =========================
  // ÜRÜNLERİ GETİR
  // =========================

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Ürünler alınamadı:", error);
    }
  };

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      }
    };

    loadInitialProducts();
  }, []);

  // =========================
  // ARAMA
  // =========================

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      await loadProducts();
      return;
    }

    try {
      const data = await searchProducts(value);
      setProducts(data);
    } catch (error) {
      console.error("Ürün araması yapılamadı:", error);
      setProducts([]);
    }
  };

  // =========================
  // ÜRÜN EKLE
  // =========================

  const handleCreateProduct = async () => {
    try {
      await createProduct({
        productCode: newProduct.productCode,
        name: newProduct.name,
        price: Number(newProduct.price),
        stockQuantity: Number(newProduct.stockQuantity),
        criticalStockLevel: Number(newProduct.criticalStockLevel),
      });

      alert("Ürün başarıyla eklendi.");

      setOpenAddModal(false);

      setNewProduct({
        productCode: "",
        name: "",
        price: "",
        stockQuantity: "",
        criticalStockLevel: "",
      });

      await loadProducts();
    } catch (error) {
      console.error("Ürün eklenemedi:", error);
      alert("Ürün eklenemedi.");
    }
  };

  // =========================
  // GÜNCELLEME MODALINI AÇ
  // =========================

  const openEditProduct = (product: Product) => {
    setEditingProduct({
      id: product.id,
      productCode: product.productCode,
      name: product.name,
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      criticalStockLevel: product.criticalStockLevel.toString(),
      isActive: product.isActive,
    });

    setOpenEditModal(true);
  };

  // =========================
  // ÜRÜN GÜNCELLE
  // =========================

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(editingProduct.id, {
        productCode: editingProduct.productCode,
        name: editingProduct.name,
        price: Number(editingProduct.price),
        stockQuantity: Number(editingProduct.stockQuantity),
        criticalStockLevel: Number(editingProduct.criticalStockLevel),
        isActive: editingProduct.isActive,
      });

      alert("Ürün başarıyla güncellendi.");

      setOpenEditModal(false);

      await loadProducts();
    } catch (error) {
      console.error("Ürün güncellenemedi:", error);
      alert("Ürün güncellenemedi.");
    }
  };

  // =========================
  // SİLME MODALINI AÇ
  // =========================

  const openDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setOpenDeleteModal(true);
  };

  // =========================
  // ÜRÜN SİL
  // =========================

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    try {
      await deleteProduct(deletingProduct.id);

      alert("Ürün başarıyla silindi.");

      setOpenDeleteModal(false);
      setDeletingProduct(null);

      await loadProducts();
    } catch (error) {
      console.error("Ürün silinemedi:", error);
      alert("Ürün silinemedi.");
    }
  };

  // =========================
  // SEPETE EKLE
  // =========================

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      alert("Ürün sepete eklendi.");
    } catch (error) {
      console.error("Ürün sepete eklenemedi:", error);
      alert("Ürün sepete eklenemedi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* =========================
          BAŞLIK
      ========================= */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Ürünler</h1>

          <p className="mt-1 text-sm text-gray-500">
            Firmanıza ait ürünleri görüntüleyin ve yönetin.
          </p>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
          sx={{
            backgroundColor: "#1E293B",
            "&:hover": {
              backgroundColor: "#334155",
            },
          }}
        >
          + Ürün Ekle
        </Button>
      </div>

      {/* =========================
          ARAMA
      ========================= */}

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Ürün adı veya ürün kodu ara..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#1E293B] focus:ring-1 focus:ring-[#1E293B]"
        />
      </div>

      {/* =========================
          ÜRÜN TABLOSU
      ========================= */}

      <TableContainer
        component={Paper}
        elevation={0}
        className="overflow-hidden rounded-xl border border-gray-200"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell sx={{ fontWeight: 600 }}>Ürün Kodu</TableCell>

              <TableCell sx={{ fontWeight: 600 }}>Ürün Adı</TableCell>

              <TableCell sx={{ fontWeight: 600 }}>Fiyat</TableCell>

              <TableCell sx={{ fontWeight: 600 }}>Stok</TableCell>

              <TableCell align="center" sx={{ fontWeight: 600 }}>
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" className="py-10">
                  <p className="text-gray-500">Ürün bulunamadı.</p>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.productCode}</TableCell>

                  <TableCell className="font-medium">{product.name}</TableCell>

                  <TableCell>
                    {product.price.toLocaleString("tr-TR")} ₺
                  </TableCell>

                  <TableCell>{product.stockQuantity}</TableCell>

                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-2">
                      {/* GÜNCELLE */}

                      <Tooltip title="Güncelle">
                        <IconButton
                          size="small"
                          onClick={() => openEditProduct(product)}
                          sx={{
                            backgroundColor: "#1E293B",
                            color: "white",
                            width: 34,
                            height: 34,
                            "&:hover": {
                              backgroundColor: "#334155",
                            },
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* SİL */}

                      <Tooltip title="Sil">
                        <IconButton
                          size="small"
                          onClick={() => openDeleteProduct(product)}
                          sx={{
                            backgroundColor: "#DC2626",
                            color: "white",
                            width: 34,
                            height: 34,
                            "&:hover": {
                              backgroundColor: "#B91C1C",
                            },
                          }}
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* SEPET */}

                      <Tooltip title="Sepete ekle">
                        <span>
                          <IconButton
                            size="small"
                            onClick={() => handleAddToCart(product.id)}
                            disabled={product.stockQuantity <= 0}
                            sx={{
                              backgroundColor: "#1E293B",
                              color: "white",
                              width: 34,
                              height: 34,

                              "&:hover": {
                                backgroundColor: "#334155",
                              },

                              "&.Mui-disabled": {
                                backgroundColor: "#CBD5E1",
                                color: "white",
                              },
                            }}
                          >
                            <ShoppingCartOutlinedIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* =====================================================
          ÜRÜN EKLE MODALI
      ===================================================== */}

      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Yeni Ürün Ekle</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-4 pt-2">
            <TextField
              label="Ürün Kodu"
              value={newProduct.productCode}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  productCode: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Ürün Adı"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Fiyat"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Stok"
              type="number"
              value={newProduct.stockQuantity}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stockQuantity: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Kritik Stok Seviyesi"
              type="number"
              value={newProduct.criticalStockLevel}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  criticalStockLevel: e.target.value,
                })
              }
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>İptal</Button>

          <Button
            variant="contained"
            onClick={handleCreateProduct}
            sx={{
              backgroundColor: "#1E293B",
              "&:hover": {
                backgroundColor: "#334155",
              },
            }}
          >
            Ürünü Ekle
          </Button>
        </DialogActions>
      </Dialog>

      {/* =====================================================
          ÜRÜN GÜNCELLEME MODALI
      ===================================================== */}

      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Ürünü Güncelle</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-4 pt-2">
            <TextField
              label="Ürün Kodu"
              value={editingProduct.productCode}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  productCode: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Ürün Adı"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Fiyat"
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Stok"
              type="number"
              value={editingProduct.stockQuantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stockQuantity: e.target.value,
                })
              }
              fullWidth
            />

            <TextField
              label="Kritik Stok Seviyesi"
              type="number"
              value={editingProduct.criticalStockLevel}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  criticalStockLevel: e.target.value,
                })
              }
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>İptal</Button>

          <Button
            variant="contained"
            onClick={handleUpdateProduct}
            sx={{
              backgroundColor: "#1E293B",
              "&:hover": {
                backgroundColor: "#334155",
              },
            }}
          >
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      {/* =====================================================
          ÜRÜN SİLME MODALI
      ===================================================== */}

      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Ürünü Sil</DialogTitle>

        <DialogContent>
          <p className="text-sm text-gray-600">
            {deletingProduct
              ? `"${deletingProduct.name}" ürününü silmek istediğinize emin misiniz?`
              : "Bu ürünü silmek istediğinize emin misiniz?"}
          </p>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteModal(false);
              setDeletingProduct(null);
            }}
          >
            İptal
          </Button>

          <Button
            variant="contained"
            onClick={handleDeleteProduct}
            sx={{
              backgroundColor: "#DC2626",
              "&:hover": {
                backgroundColor: "#B91C1C",
              },
            }}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
