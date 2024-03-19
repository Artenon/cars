import { ReactNode, FC } from "react";
import { NavBar } from "@/components/nav-bar";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
