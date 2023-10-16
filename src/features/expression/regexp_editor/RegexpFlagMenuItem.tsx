import { BsCheck } from "react-icons/bs";

type Props = {
  visible: boolean;
  label: string;
  description: string;
};

const RegexpFlagMenuItem = ({ visible, label, description }: Props) => {
  return (
    <div className="d-grid g-horizontal-af">
      <div style={{ width: "24px" }}>
        {visible && <BsCheck color="lightgreen" size="1.2em" />}
      </div>
      <div>
        <div>{label}</div>
        <div className="small text-secondary">{description}</div>
      </div>
    </div>
  );
};

export default RegexpFlagMenuItem;
