import { Text, TextInput, TextInputProps, View } from "react-native";
import colors from "tailwindcss/colors";

type InputProps = TextInputProps;

export const Input = ({ ...rest }: InputProps) => {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      className="h-32 bg-slate-800 rounded-s-md px-4 py-3 text-sm text-white font-body"
      {...rest}
    />
  );
};
