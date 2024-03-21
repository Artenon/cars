import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { Container, Form, Button, Row, Col, InputGroup, Spinner } from "react-bootstrap";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FormGroup } from "@/components/form-group";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCars } from "@/store/data-slice/data-slice";
import { Car } from "@/components/car";
import { IFilter, ICar } from "@/types/car";
import { BASE_URL } from "@/const";

export default function Create() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cars = useAppSelector((state) => state.cars);

  const { control, handleSubmit } = useForm<IFilter>({ defaultValues: {} });

  const searchCars = async (filter: IFilter) => {
    const { body, brand, mileage, model, price, productionYear } = filter;
    setIsLoading(true);
    const { data } = await axios.get<ICar[]>(
      `${BASE_URL}?${brand ? `technical_characteristics.brand=${brand}` : ""}
      ${body ? `&technical_characteristics.body=${body}` : ""}
      ${mileage.from ? `&technical_characteristics.mileage_gt=${mileage.from}` : ""}
      ${mileage.to ? `&technical_characteristics.mileage_lt=${mileage.to}` : ""}
      ${price.from ? `&price_gt=${price.from}` : ""}
      ${price.to ? `&price_lt=${price.to}` : ""}
      ${model ? `&technical_characteristics.model=${model}` : ""}
      ${productionYear ? `&technical_characteristics.productionYear=${productionYear}` : ""}`
    );
    dispatch(setCars(data));
    setIsLoading(false);
  };

  const submitHandler: SubmitHandler<IFilter> = (filter) => {
    searchCars(filter);
  };

  useEffect(() => {
    const getCars = async () => {
      setIsLoading(true);
      const { data } = await axios.get<ICar[]>(BASE_URL);
      dispatch(setCars(data));
      setIsLoading(false);
    };
    getCars();
  }, [dispatch]);

  return (
    <Container className="py-4">
      <Head>
        <title>Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-center">Поиск</h2>

      <Form onSubmit={handleSubmit(submitHandler)} className="mb-3">
        <Row>
          <Controller
            control={control}
            name="brand"
            render={({ field }) => (
              <FormGroup controlId="brand" field={{ ...field }} label="Марка" />
            )}
          />

          <Controller
            control={control}
            name="model"
            render={({ field }) => (
              <FormGroup controlId="model" field={{ ...field }} label="Модель" />
            )}
          />

          <Controller
            control={control}
            name="productionYear"
            render={({ field }) => (
              <FormGroup controlId="productionYear" field={{ ...field }} label="Год выпуска" />
            )}
          />
        </Row>

        <Row>
          <Controller
            control={control}
            name="mileage.from"
            render={({ field }) => (
              <Col className="mb-2">
                <Form.Label htmlFor="mileage.from">Пробег от</Form.Label>
                <InputGroup>
                  <InputGroup.Text>км</InputGroup.Text>
                  <Form.Control {...field} id="mileage.from" />
                </InputGroup>
              </Col>
            )}
          />
          <Controller
            control={control}
            name="mileage.to"
            render={({ field }) => (
              <Col className="mb-2">
                <Form.Label htmlFor="mileage.to">Пробег до</Form.Label>
                <InputGroup>
                  <InputGroup.Text>км</InputGroup.Text>
                  <Form.Control {...field} id="mileage.to" />
                </InputGroup>
              </Col>
            )}
          />
        </Row>

        <Row>
          <Controller
            control={control}
            name="price.from"
            render={({ field }) => (
              <Col className="mb-2">
                <Form.Label htmlFor="price.from">Цена от</Form.Label>
                <InputGroup>
                  <InputGroup.Text>₽</InputGroup.Text>
                  <Form.Control {...field} id="price.from" />
                </InputGroup>
              </Col>
            )}
          />
          <Controller
            control={control}
            name="price.to"
            render={({ field }) => (
              <Col className="mb-2">
                <Form.Label htmlFor="price.to">Цена до</Form.Label>
                <InputGroup>
                  <InputGroup.Text>₽</InputGroup.Text>
                  <Form.Control {...field} id="price.to" />
                </InputGroup>
              </Col>
            )}
          />
        </Row>

        <div className="mt-3 d-flex justify-content-between">
          <Button type="submit">Поиск</Button>
        </div>
      </Form>

      {isLoading ? (
        <div className="mt-2 text-center">
          <Spinner />
        </div>
      ) : cars.length === 0 ? (
        <h3 className="mt-2 text-center">Ничего не найдено :(</h3>
      ) : (
        cars.map((car) => <Car car={car} key={car.id} />)
      )}
    </Container>
  );
}
