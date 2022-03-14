import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderProvider } from "./components/Layout/HeaderContext";
import Layout from "./components/Layout/Layout";
import useToken from "./shared/network/login.api";
import Categories from "./views/Category/Categories";
import Intervals from "./views/Interval/Intervals";
import Locations from "./views/Location/Locations";
import Logs from "./views/Log/Logs";
import Qualifications from "./views/Qualification/Qualifications";
import DateFnsUtils from "@date-io/date-fns";
import EmployeeCreate from "./views/Employee/EmployeeCreate";

const Dashboard = lazy(() => import("./views/Dashboard"));
const Employees = lazy(() => import("./views/Employee/Employees"));
const Issues = lazy(() => import("./views/Issue/Issues"));
const Tools = lazy(() => import("./views/Tool/Tools"));

function App() {
  const { token, setToken, removeToken } = useToken();

  /*if (!token) {
    return <Login setToken={setToken} />;
  }*/

  return (
    <>
      <HeaderProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout removeToken={removeToken}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee-create" element={<EmployeeCreate />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/intervals" element={<Intervals />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/qualifications" element={<Qualifications />} />
            </Routes>
          </Layout>
        </MuiPickersUtilsProvider>
      </HeaderProvider>
    </>
  );
}

export default App;
