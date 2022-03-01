import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HeaderProvider } from "./Components/Layout/HeaderContext";
import { useDispatch } from "react-redux";
import { saveToken, tokenExists } from "./Util/authToken";
import {
  fetchAccount,
  finishInitializing,
} from "./shared/reducers/authentication";
import LayoutLoading from "./Components/Layout/LayoutLoading";
import Layout from "./Components/Layout/Layout";

const Home = lazy(() => import("./Views/Home/Home"));
/*
const combinePaths = (parent: any, child: any) =>
  `${parent.replace(/\/$/, "")}/${child.replace(/^\//, "")}`;

const buildPaths = (navigation: any, parentPath: any = "") =>
  navigation.map((route: any) => {
    const path = combinePaths(parentPath, route.path);

    return {
      ...route,
      path,
      ...(route.routes && { routes: buildPaths(route.routes, path) }),
    };
  });

const flattenRoutes = (routes: any) =>
  routes
    .map((route: any) => [
      route.routes ? flattenRoutes(route.routes) : [],
      route,
    ])
    .flat(Infinity);*/

function App() {
  const dispatch = useDispatch();

  function getCookie(name: string) {
    return document.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith(name))
      ?.split("=")[1];
  }

  useEffect(() => {
    if (tokenExists()) {
      dispatch(fetchAccount());
    } else {
      dispatch(finishInitializing());
    }
  }, [dispatch]);

  useEffect(() => {
    const authToken = getCookie("auth_token");

    if (authToken) {
      saveToken(authToken);
      dispatch(fetchAccount());
    }
  }, [dispatch]);

  return (
    <HeaderProvider>
      <Suspense fallback={<LayoutLoading />}>
        <Layout>
          <Routes>
            <Route path="/home" element={Home} />
          </Routes>
        </Layout>
      </Suspense>
    </HeaderProvider>
  );
}

export default App;
