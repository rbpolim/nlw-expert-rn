import { View, ActivityIndicator } from "react-native";
import color from "tailwindcss/colors";

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <ActivityIndicator size="large" color={color.white} />
    </View>
  );
};
