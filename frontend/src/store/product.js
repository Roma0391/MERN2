import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill an all filds." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product has been created" };
  },
  fetchProducts: async () => {
    const res = await fetch("api/products");
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: "Cannot fetch products" };
    } else {
      set(() => ({ products: data.data }));
      return { success: true, message: "Product has been fetching" };
    }
  },
  deleteProduct: async (id) => {
    const res = await fetch(`api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    } else {
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      return { success: true, message: data.message };
    }
  },
  updateProduct: async (id, body) => {
    const res = await fetch(`api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((p) => {
        if (p._id === id) {
          return data.data;
        } else {
          return p;
        }
      }),
    }));
    return { success: true, message: data.message };
  },
}));
