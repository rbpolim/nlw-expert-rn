import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
} & TouchableOpacityProps;

type ButtonTextProps = {
  children: React.ReactNode;
};

type ButtonIconProps = {
  children: React.ReactNode;
};

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonText = ({ children }: ButtonTextProps) => {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
};

const ButtonIcon = ({ children }: ButtonIconProps) => {
  return children;
};

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
