import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import useToken from "./shared/network/login.api";

const Dashboard = lazy(() => import("./views/Dashboard"));
const Employees = lazy(() => import("./views/Employees"));
const Issues = lazy(() => import("./views/Issues"));
const Tools = lazy(() => import("./views/Tools"));

function App() {
  const { token, setToken, removeToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <Layout removeToken={removeToken}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
