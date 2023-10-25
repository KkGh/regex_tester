import { ComponentPropsWithRef, PropsWithChildren } from "react";

type Props = PropsWithChildren<ComponentPropsWithRef<"div">>;

export const FillDiv = (props: Props) => {
  const { className, children, ...rest } = props;
  return (
    <div className={`h-100 overflow-y-auto ${className}`} {...rest}>
      {children}
    </div>
  );
};
