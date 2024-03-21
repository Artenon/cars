import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IoIosRemoveCircle } from "react-icons/io";
import { FormGroup } from "@/components/form-group";
import { ICar } from "@/types/car";
import { BASE_URL } from "@/const";

import styles from "./create.module.scss";

const createCar = async (car: ICar) => {
  await axios.post(BASE_URL, { car });
};

export default function Create() {
  const { push } = useRouter();

  const [showTech, setShowTech] = useState<boolean>(false);
  const [options, setOptions] = useState<{ option_name: string }[]>([]);

  const { control, handleSubmit } = useForm<ICar>({ defaultValues: {} });

  const submitHandler: SubmitHandler<ICar> = (car) => {
    if (!showTech) {
      delete car.technical_characteristics;
    }
    if (options.length !== 0) {
      car.options = options;
    }
    createCar(car);
    push("/");
  };

  return (
    <Container className="py-4">
      <Head>
        <title>Create</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-center">Создание</h2>

      <Form onSubmit={handleSubmit(submitHandler)} className={`${styles.form} rounded p-3`}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field, fieldState: { invalid } }) => (
            <FormGroup
              controlId="name"
              field={{ ...field }}
              label="Название"
              invalid={invalid}
              errorMessage="Заполните название"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field, fieldState: { invalid } }) => (
            <FormGroup
              controlId="description"
              field={{ ...field }}
              label="Описание"
              as="textarea"
              invalid={invalid}
              errorMessage="Заполните описание"
            />
          )}
        />

        <Row>
          <Controller
            control={control}
            name="price"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <Col className="mb-2">
                <Form.Label htmlFor="price">Цена</Form.Label>
                <InputGroup>
                  <InputGroup.Text>₽</InputGroup.Text>
                  <Form.Control
                    {...field}
                    id="price"
                    className={`${invalid && "border border-danger"}`}
                  />
                </InputGroup>
                {invalid && (
                  <Form.Text className="text-danger">Цена не может быть пустой</Form.Text>
                )}
              </Col>
            )}
          />

          <Controller
            control={control}
            name="images"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <FormGroup
                controlId="images"
                field={{ ...field }}
                label="Фото"
                type="file"
                invalid={invalid}
                errorMessage="Прикрепите фото"
              />
            )}
          />

          <Controller
            control={control}
            name="contacts"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <FormGroup
                controlId="contacts"
                field={{ ...field }}
                label="Контакты"
                invalid={invalid}
                errorMessage="Заполните Ваши контакты"
              />
            )}
          />
        </Row>

        <Form.Check
          type="checkbox"
          label="Добавить технические характеристики"
          id="tech"
          className="mb-2"
          checked={showTech}
          onChange={() => setShowTech(!showTech)}
        />

        {showTech && (
          <>
            <Row>
              <Controller
                control={control}
                name="technical_characteristics.brand"
                rules={{ required: true }}
                render={({ field, fieldState: { invalid } }) => (
                  <FormGroup
                    controlId="brand"
                    field={{ ...field }}
                    label="Марка"
                    invalid={invalid}
                    errorMessage="Какая марка?"
                  />
                )}
              />

              <Controller
                control={control}
                rules={{ required: true }}
                name="technical_characteristics.model"
                render={({ field, fieldState: { invalid } }) => (
                  <FormGroup
                    controlId="model"
                    field={{ ...field }}
                    label="Модель"
                    invalid={invalid}
                    errorMessage="Какая модель?"
                  />
                )}
              />
            </Row>

            <Row>
              <Controller
                control={control}
                name="technical_characteristics.productionYear"
                rules={{ required: true }}
                render={({ field, fieldState: { invalid } }) => (
                  <FormGroup
                    controlId="productionYear"
                    field={{ ...field }}
                    label="Год выпуска"
                    invalid={invalid}
                    errorMessage="Машина должна иметь год выпуска"
                  />
                )}
              />

              <Controller
                control={control}
                name="technical_characteristics.body"
                rules={{ required: true }}
                render={({ field, fieldState: { invalid } }) => (
                  <FormGroup
                    controlId="body"
                    field={{ ...field }}
                    label="Кузов"
                    invalid={invalid}
                    errorMessage="Без кузова никак"
                  />
                )}
              />

              <Controller
                control={control}
                name="technical_characteristics.mileage"
                rules={{ required: true }}
                render={({ field, fieldState: { invalid } }) => (
                  <Col className="mb-2">
                    <Form.Label htmlFor="mileage">Пробег</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>км</InputGroup.Text>
                      <Form.Control
                        {...field}
                        id="mileage"
                        className={`${invalid && "border border-danger"}`}
                      />
                    </InputGroup>
                    {invalid && <Form.Text className="text-danger">Заполните пробег</Form.Text>}
                  </Col>
                )}
              />
            </Row>
          </>
        )}

        {Array.from({ length: options.length }).map((_, idx) => (
          <div key={`option${idx}`} className="mb-2">
            <Form.Label htmlFor={`option${idx}`}>Опция {idx + 1}</Form.Label>
            <InputGroup>
              <Form.Control
                id={`option${idx}`}
                onChange={(e) => {
                  const newArray = [...options];
                  newArray[idx].option_name = `${e.target.value}`;
                  setOptions(newArray);
                }}
                value={options[idx].option_name}
              />
              <Button
                variant="danger"
                className="d-flex align-items-center"
                onClick={() => {
                  const newArray = [...options];
                  newArray.splice(idx, 1);
                  setOptions(newArray);
                }}
              >
                <IoIosRemoveCircle size={20} />
              </Button>
            </InputGroup>
          </div>
        ))}

        <div className="mt-3 d-flex justify-content-between">
          <Button variant="secondary" onClick={() => setOptions([...options, { option_name: "" }])}>
            Добавить опцию
          </Button>

          <Button type="submit">Создать</Button>
        </div>
      </Form>
    </Container>
  );
}
