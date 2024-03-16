import { AlertType } from "@/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

type Props = { alertProps: AlertType };

export default function AlertComponent(props: Props): JSX.Element {
  const { alertProps } = props;
  const { title, description, status } = alertProps;
  return (
    <div className="mt-8 flex justify-center">
      <Alert className="!w-3/5" status={status}>
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
