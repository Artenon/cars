import { FC } from "react";
import { Col, Form } from "react-bootstrap";
import { ElementType } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface FormGroupProps {
  controlId: string;
  field: ControllerRenderProps;
  label: string;
  type?: string;
  as?: ElementType<any, keyof JSX.IntrinsicElements>;
  invalid?: boolean;
  errorMessage?: string;
}

export const FormGroup: FC<FormGroupProps> = ({
  controlId,
  field,
  label,
  type = "text",
  as,
  invalid = false,
  errorMessage = "Неправильно заполненное поле",
}) => {
  return (
    <Form.Group as={Col} className="mb-2" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        type={type}
        as={as}
        className={`${invalid && "border border-danger"}`}
      />
      {invalid && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
    </Form.Group>
  );
};
