import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCart } from "../context/CartContext";

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { cartItems, removeFromCart, saveCartToSupabase } = useCart();
  const [loading, setLoading] = useState(false);

  const totalGeral = cartItems.reduce(
    (total, item) => total + item.Preco * item.quantidade,
    0
  );

  const handleFinalize = async () => {
    setLoading(true);
    await saveCartToSupabase();
    setLoading(false);
    alert("Carrinho salvo com sucesso!");
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.4, 0.75]}
      initialBreakpoint={0.4}
      handleBehavior="cycle"
    >
      <IonHeader>
        <IonToolbar
          style={{
            "--background": "black",
            "--color": "white",
          }}
        >
          <IonTitle>
            <h1>Carrinho de Compras</h1>
          </IonTitle>
          <IonButton
            className="btn-fechar"
            slot="end"
            onClick={onClose}
            style={{
              "--background": "#c3ff30",
              "--color": "black",
            }}
          >
            Fechar
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              console.log("Item no carrinho:", item);

              // ✅ Corrigido para aceitar array ou string
              const imagemUrl = Array.isArray(item.Imagem)
                ? item.Imagem[0]?.url?.startsWith("http")
                  ? item.Imagem[0].url
                  : "https://via.placeholder.com/60"
                : typeof item.Imagem === "string" &&
                  item.Imagem.startsWith("http")
                ? item.Imagem
                : "https://via.placeholder.com/60";

              return (
                <IonItem key={item.id}>
                  <img
                    src={imagemUrl}
                    alt={item.Nome}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      marginRight: 10,
                      borderRadius: 8,
                    }}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/60?text=Erro")
                    }
                  />
                  <IonLabel className="ion-text-wrap">
                    <h2>{item.Nome}</h2>
                    <p>
                      R$ {item.Preco.toFixed(2)} x {item.quantidade}
                    </p>
                    <p>Total: R$ {(item.Preco * item.quantidade).toFixed(2)}</p>
                  </IonLabel>
                  <IonButton
                    color="danger"
                    slot="end"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </IonButton>
                </IonItem>
              );
            })
          ) : (
            <IonItem>
              <IonLabel>
                <p>O Carrinho está vazio</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>

        {cartItems.length > 0 && (
          <>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                <h2 style={{ fontWeight: "bold" }}>Total geral:</h2>
              </IonLabel>
              <IonLabel slot="end">
                <h2 style={{ color: "green", fontWeight: "bold" }}>
                  R$ {totalGeral.toFixed(2)}
                </h2>
              </IonLabel>
            </IonItem>

            <IonButton
              expand="block"
              color="success"
              style={{ margin: 16 }}
              onClick={handleFinalize}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Finalizar Compra"}
            </IonButton>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default CartModal;
