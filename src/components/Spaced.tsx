import { ReactNode } from "react";

type Props = {
  left: ReactNode;
  right: ReactNode;
};

export const Spaced = ({ left, right }: Props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {left}
      {right}
    </div>
  );
};
