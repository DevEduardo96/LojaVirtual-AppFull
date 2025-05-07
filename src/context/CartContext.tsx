import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Produto {
  id: number;
  Nome: string;
  Preco: number;
}

interface ItemCarrinho extends Produto {
  Imagem?: any;
  quantidade: number;
  isAnimating?: boolean; // Novo campo
}

interface CartContextType {
  cartItems: ItemCarrinho[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  triggerAnimation: (id: number) => void; // Novo método
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ItemCarrinho[]>([]);

  const addToCart = (produto: Produto) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prevItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1, isAnimating: true }
            : item
        );
      } else {
        return [...prevItems, { ...produto, quantidade: 1, isAnimating: true }];
      }
    });

    // Limpar a animação após um tempo
    setTimeout(() => triggerAnimation(produto.id, false), 300); // 300ms de animação
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const triggerAnimation = (id: number, animate = true) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isAnimating: animate } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        triggerAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
