import { Pressable, Text, PressableProps } from "react-native";
import { clsx } from "clsx";

type CategoryButtonProps = {
  title: string;
  isSelected?: boolean;
} & PressableProps;

export const CategoryButton = ({
  title,
  isSelected,
  ...rest
}: CategoryButtonProps) => {
  return (
    <Pressable
      {...rest}
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10",
        isSelected && "border-2 border-lime-300"
      )}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
};
