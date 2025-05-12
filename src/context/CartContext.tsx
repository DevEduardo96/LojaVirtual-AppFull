import React, { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "../services/supabaseClient"; // ✅ 1. importa o Supabase

export interface Produto {
  id: number;
  Nome: string;
  Preco: number;
}

interface ItemCarrinho extends Produto {
  Imagem?: any;
  quantidade: number;
  isAnimating?: boolean;
}

interface CartContextType {
  cartItems: ItemCarrinho[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  triggerAnimation: (id: number) => void;
  saveCartToSupabase: () => Promise<void>; // ✅ adiciona no contexto
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ItemCarrinho[]>([]);

  // Adiciona item ao carrinho
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

    setTimeout(() => triggerAnimation(produto.id, false), 300); // Remove animação após 300ms
  };

  // Remove item do carrinho
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Dispara a animação ao adicionar/remover um item
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
      // Você pode também limpar o carrinho aqui, se quiser:
      // clearCart();
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
        saveCartToSupabase, // ✅ 3. expõe para outros componentes
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
