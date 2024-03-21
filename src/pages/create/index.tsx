import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomForm } from "@/components/form";
import { ICar } from "@/types/car";
import { BASE_URL } from "@/const";

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

      <CustomForm
        control={control}
        handleSubmit={handleSubmit}
        options={options}
        setOptions={setOptions}
        showTech={showTech}
        setShowTech={setShowTech}
        submitHandler={submitHandler}
      />
    </Container>
  );
}
