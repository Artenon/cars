import { FC } from "react";
import { Button, Card, Col, Row, Accordion } from "react-bootstrap";
import { IoMdPricetag } from "react-icons/io";
import { BsChatLeftTextFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import type { ICar } from "@/types/car";

import styles from "./car.module.scss";

interface ICarProps {
  car: ICar;
}

export const Car: FC<ICarProps> = ({ car }) => {
  return (
    <Col>
      <Card key={`${car.id}`}>
        <Row>
          <Col lg="4" className="d-flex align-items-center">
            <Card.Img src={car.images[0]} loading="lazy" />
          </Col>
          <Col lg="8">
            <Card.Body>
              <Card.Title>{car.name}</Card.Title>
              <Card.Text className="d-flex flex-column gap-2">
                <span>
                  <span className="fw-bold d-flex align-items-center gap-1 text-black-50">
                    <IoMdPricetag /> Цена:
                  </span>
                  <span className="fs-4">
                    {car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
                  </span>
                </span>

                <span>
                  <span className="fw-bold d-flex align-items-center gap-1 text-black-50">
                    <BsChatLeftTextFill />
                    Описание:
                  </span>
                  <span>{car.description}</span>
                </span>

                <span>
                  <span className="fw-bold d-flex align-items-center gap-1 text-black-50">
                    <MdContacts />
                    Контакты:
                  </span>
                  <span>{car.contacts}</span>
                </span>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      {(car.technical_characteristics || car.options) && (
        <Accordion flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Accordion.Button className={styles.accordionButton}>
              Показать дополнительную информацию
            </Accordion.Button>
            <Accordion.Body>
              {car.technical_characteristics && (
                <>
                  <span>
                    <span className="fw-bold d-block text-black-50">Марка:</span>
                    <span>{car.technical_characteristics.brand}</span>
                  </span>

                  <span>
                    <span className="fw-bold d-block text-black-50">Модель:</span>
                    <span>{car.technical_characteristics.model}</span>
                  </span>

                  <span>
                    <span className="fw-bold d-block text-black-50">Пробег:</span>
                    <span>
                      {car.technical_characteristics.mileage
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      км
                    </span>
                  </span>

                  <span>
                    <span className="fw-bold d-block text-black-50">Год выпуска:</span>
                    <span>{car.technical_characteristics.productionYear}</span>
                  </span>

                  <span>
                    <span className="fw-bold d-block text-black-50">Кузов:</span>
                    <span>{car.technical_characteristics.body}</span>
                  </span>
                </>
              )}

              {car.options && (
                <span>
                  <span className="fw-bold d-block text-black-50">Дополнительные опции:</span>
                  <div className="d-flex flex-column">
                    {car.options.map((option, idx) => (
                      <span key={`${option.option_name}-${idx}`}>- {option.option_name}</span>
                    ))}
                  </div>
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </Col>
  );
};
