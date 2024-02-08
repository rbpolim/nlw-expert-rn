import { Link } from "expo-router";
import { useState, useRef } from "react";
import { View, FlatList, SectionList, Text } from "react-native";

import Product from "@/components/product";
import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { CATEGORIES, MENU } from "@/utils/data/products";

export const Home = () => {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);

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
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link asChild href={`/product/${item.id}`}>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default Home;
