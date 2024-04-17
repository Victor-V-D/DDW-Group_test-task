import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginBuilder from "./containers/AuthenticationBuilder/LoginBuilder/LoginBuilder";
import RegisterBuilder from "./containers/AuthenticationBuilder/RegisterBuilder/RegisterBuilder";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CreateBook from "./containers/BookBuilder/CreateBook";
import BookBuilder from "./containers/BookBuilder/BookBuilder";
import { useAppSelector } from "./hooks/hooks";

const routes = [
  {
    path: "/",
    element: <BookBuilder />,
  },
  {
    path: "/book",
    element: <BookBuilder />,
  },
  {
    path: "/user/register",
    element: <RegisterBuilder />,
  },
  {
    path: "/user/login",
    element: <LoginBuilder />,
  },
];

function App() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route
          element={
            <ProtectedRoute isAllowed={!!user} redirectPath="/user/login" />
          }
        >
          <Route path="/book/create" element={<CreateBook />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
