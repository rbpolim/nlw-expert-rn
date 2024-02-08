import { useState } from "react";
import { View, FlatList } from "react-native";

import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { CATEGORIES } from "@/utils/data/products";

export const Home = () => {
  const [category, setCategory] = useState("");

  const onPress = (category: string) => {
    setCategory(category);
  };

  return (
    <View>
      <Header title="Faça seu pedido" cartQuantity={7} />
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
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default Home;
