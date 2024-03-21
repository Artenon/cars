import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Inter } from "next/font/google";
import { Spinner, Row, Container } from "react-bootstrap";
import { setCars } from "@/store/data-slice/data-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Car } from "@/components/car";
import type { ICar } from "@/types/car";
import { BASE_URL } from "@/const";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cars = useAppSelector((state) => state.cars);

  useEffect(() => {
    async function getCars() {
      setIsLoading(true);
      const { data } = await axios.get<ICar[]>(BASE_URL);
      dispatch(setCars(data));
      setIsLoading(false);
    }
    getCars();
  }, [dispatch]);

  return (
    <Container className="py-4">
      <Head>
        <title>Cars</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} d-flex flex-column gap-4`}>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : (
          <Row xs={1}>
            {cars.map((car) => (
              <Car key={car.id} car={car} />
            ))}
          </Row>
        )}
      </main>
    </Container>
  );
}
