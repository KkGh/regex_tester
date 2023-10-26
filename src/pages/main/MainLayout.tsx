import { ReactNode, memo } from "react";
import { Nav, Tab } from "react-bootstrap";
import styles from "./MainLayout.module.css";
import { ResponsiveGrid } from "../../components/ResponsiveGrid";

type Props = {
  regExpression: ReactNode;
  regText: ReactNode;
  regMatchList: ReactNode;
  regReplace: ReactNode;
  regExtract: ReactNode;
  regCheetSheet: ReactNode;
};

export const MainLayout = memo((props: Props) => {
  const {
    regExpression,
    regText,
    regMatchList,
    regReplace,
    regExtract,
    regCheetSheet,
  } = props;
  const tabs = [
    {
      eventKey: "match",
      title: "Match",
      node: regMatchList,
    },
    {
      eventKey: "replace",
      title: "Replace",
      node: regReplace,
    },
    {
      eventKey: "extract",
      title: "Extract",
      node: regExtract,
    },
    {
      eventKey: "info",
      title: "Info",
      node: regCheetSheet,
    },
  ];

  const operation = (
    <div className={styles.tab}>
      <Tab.Container defaultActiveKey={tabs[0].eventKey} transition={false}>
        <Nav variant="tabs" justify>
          {tabs.map((t) => (
            <Nav.Item key={t.eventKey}>
              <Nav.Link eventKey={t.eventKey} as="button">
                {t.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content className={`h-100 ${styles["tab-content"]}`}>
          {tabs.map((t) => (
            <Tab.Pane key={t.eventKey} eventKey={t.eventKey} className="h-100">
              {t.node}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
  return (
    <div className={styles["app-root"]}>
      {regExpression}

      <ResponsiveGrid first={regText} second={operation} />
    </div>
  );
});
