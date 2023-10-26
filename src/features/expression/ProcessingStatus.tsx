import React, { memo } from "react";

type Props = {
  elapsed: number;
  error: string;
  running: boolean;
};

export const ProcessingStatus = memo<Props>((props) => {
  const { elapsed, error, running } = props;
  if (running) {
    return <span>processing</span>;
  } else if (error) {
    return <span className="text-danger">{error}</span>;
  } else {
    return <small>{`(${elapsed} ms)`}</small>;
  }
});
