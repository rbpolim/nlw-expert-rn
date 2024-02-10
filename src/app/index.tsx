import { Link } from "expo-router";
import { useState, useRef } from "react";
import { View, FlatList, SectionList, Text } from "react-native";

import { Product } from "@/components/product";
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { useCartStore } from "@/stores/cart-store";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";

const Home = () => {
  const cartStore = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantity = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const onPress = (category: string) => {
    setCategory(category);

    const sectionIndex = CATEGORIES.findIndex((item) => item === category);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantity={cartQuantity} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => onPress(item)}
          />
        )}
        horizontal
        className="max-h-10 my-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        className="flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Link asChild href={`/product/${item.id}`}>
            <Product data={item} />
          </Link>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
