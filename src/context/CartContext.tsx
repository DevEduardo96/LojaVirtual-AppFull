import React, { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "../services/supabaseClient";

// Tipagem base de um produto
export interface Produto {
  id: number;
  Nome: string;
  Preco: number;
}

// Item no carrinho estende Produto
interface ItemCarrinho extends Produto {
  Imagem?: any;
  quantidade: number;
  isAnimating?: boolean;
}

// Interface do contexto
interface CartContextType {
  cartItems: ItemCarrinho[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  triggerAnimation: (id: number) => void;
  saveCartToSupabase: () => Promise<void>;
}

// Criação do contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ItemCarrinho[]>([]);

  // Adiciona produto ao carrinho
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

    // Remove a animação após 300ms
    setTimeout(() => triggerAnimation(produto.id, false), 300);
  };

  // Remove item do carrinho
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Controla a animação de adição/remoção
  const triggerAnimation = (id: number, animate = true) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isAnimating: animate } : item
      )
    );
  };

  // Salva o carrinho no Supabase
  const saveCartToSupabase = async () => {
    if (cartItems.length === 0) {
      console.warn("Carrinho vazio. Nada para salvar.");
      return;
    }

    const dataToInsert = cartItems.map((item) => ({
      produto_id: item.id,
      nome: item.Nome,
      preco: item.Preco,
      quantidade: item.quantidade,
      imagem_url: item.Imagem?.[0]?.url || null,
      criado_em: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("carrinho")
      .insert(dataToInsert);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
    } else {
      console.log("Carrinho salvo no Supabase com sucesso:", data);
      // clearCart(); // opcional
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        triggerAnimation,
        saveCartToSupabase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para uso do contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
