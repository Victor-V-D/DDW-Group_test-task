import { Outlet } from "react-router-dom";
import AppToolbar from "./AppToolbar/AppToolbar";
import { Container } from "@mui/material";

const Layout = (): JSX.Element => {
  return (
    <>
      <AppToolbar />
      <main>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
    </>
  )
}

export default Layout;