import { ReactNode } from "react";
import styles from "./Panel.module.css";

type Props = {
  label: ReactNode;
  content: ReactNode;
};

export const Panel = ({ label, content }: Props) => {
  return (
    <div className={styles.panel}>
      <div className={styles.label}>{label}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
