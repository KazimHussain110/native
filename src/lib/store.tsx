import { createContext, useContext, useState, type ReactNode } from "react";
import { products } from "@/routes/products/$slug";

type Product = (typeof products)[number];

interface StoreCtx {
  cart: string[];
  wishlist: string[];
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  toggleWishlist: (slug: string) => void;
  cartItems: Product[];
  wishlistItems: Product[];
}

const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToCart = (slug: string) => setCart((p) => (p.includes(slug) ? p : [...p, slug]));

  const removeFromCart = (slug: string) => setCart((p) => p.filter((s) => s !== slug));

  const toggleWishlist = (slug: string) =>
    setWishlist((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  const cartItems = products.filter((p) => cart.includes(p.slug));
  const wishlistItems = products.filter((p) => wishlist.includes(p.slug));

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        toggleWishlist,
        cartItems,
        wishlistItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
