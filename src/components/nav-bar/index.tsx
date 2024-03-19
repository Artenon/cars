import { FC } from "react";
import Link from "next/link";
import { Container, Nav, Navbar as NavBarUI, Button, Image } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export const NavBar: FC = () => (
  <NavBarUI>
    <Container>
      <NavBarUI.Brand>
        <Link href="/" className="d-flex gap-2 align-items-center font-monospace">
          <Image
            width={80}
            src="https://raw.githubusercontent.com/Artenon/repo/master/McQueen.jpg"
            alt="logo"
          />
          CARS
        </Link>
      </NavBarUI.Brand>
      <NavBarUI.Collapse className="justify-content-end">
        <Nav className="gap-4">
          <Link href="/search" className="fs-5">
            <Button className="d-flex align-items-center h-100 bg-transparent text-black border-0">
              <IoSearch size={24} />
            </Button>
          </Link>
          <Link href="/create" className="fs-5">
            <Button variant="dark" className="d-flex align-items-center">
              Создать <IoIosAdd size={24} />
            </Button>
          </Link>
        </Nav>
      </NavBarUI.Collapse>
    </Container>
  </NavBarUI>
);
