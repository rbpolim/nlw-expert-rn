import { Link, LinkProps } from "expo-router";

type LinkButtonProps = {
  title: string;
} & LinkProps<string>;

export const LinkButton = ({ title, ...rest }: LinkButtonProps) => {
  return (
    <Link {...rest} className="text-slate-300 text-center text-base">
      {title}
    </Link>
  );
};
