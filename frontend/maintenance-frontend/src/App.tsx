import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HeaderProvider } from "./Components/Layout/HeaderContext";

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
    .flat(Infinity);

function App() {
  return (
    <div>
      <HeaderProvider></HeaderProvider>
      <Router>
        <Switch></Switch>
      </Router>
    </div>
  );
}

export default App;
