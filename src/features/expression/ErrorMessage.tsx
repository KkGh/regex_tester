type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return <span className="text-danger small">{message}</span>;
};
