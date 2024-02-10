import { useState } from "react";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { ProductProps } from "@/utils/data/products";
import { formatCurrency } from "@/utils/fn/format-currency";

const PHONE_NUMBER = "5511960214747";

const Cart = () => {
  const [address, setAddress] = useState("");
  const navigation = useNavigation();
  const cartStore = useCartStore();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  const onRemove = (product: ProductProps) => {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover do carrinho",
        onPress: () => cartStore.removeProduct(product.id),
      },
    ]);
  };

  const onSendOrder = () => {
    if (address.trim().length === 0) {
      return Alert.alert("Endereço", "Informe o endereço de entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n - ${product.quantity}: ${product.title}`)
      .join("");

    const message = `
      🍔 Novo Pedido:
      \nEndereço de entrega: ${address}
      \nPedido: ${products}
      \nValor total: ${total}
    `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );
    cartStore.clearCart();
    navigation.goBack();
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700 ">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => onRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              returnKeyType="send"
              blurOnSubmit={true}
              onSubmitEditing={onSendOrder}
              onChangeText={(value) => setAddress(value)}
              placeholder="Informe o endereço de entrega com rua, número, bairro, CEP e complemento..."
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={onSendOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
};

export default Cart;
