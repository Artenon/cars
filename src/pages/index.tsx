import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import { Inter } from "next/font/google";
import { Row, Container } from "react-bootstrap";
import { Car } from "@/components/car";
import type { ICar } from "@/types/car";
import { BASE_URL } from "@/const";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const { data: cars } = await axios.get<ICar[]>(BASE_URL);
  return { props: { cars } };
}) satisfies GetServerSideProps<{ cars: ICar[] }>;

export default function Home({ cars }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container className="py-4">
      <Head>
        <title>Cars</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} d-flex flex-column gap-4`}>
        <Row xs={1}>
          {cars.map((car) => (
            <Car key={car.id} car={car} />
          ))}
        </Row>
      </main>
    </Container>
  );
}
