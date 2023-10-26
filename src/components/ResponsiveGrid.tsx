import { ReactNode } from "react";
import styles from "./ResponsiveGrid.module.css";

type Props = {
  first: ReactNode;
  second: ReactNode;
};

export const ResponsiveGrid = (props: Props) => {
  const { first, second } = props;
  return (
    <div className={styles.rgrid}>
      {first}
      {second}
    </div>
  );
};
