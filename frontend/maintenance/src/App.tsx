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
import EmployeeModify from "./views/Employee/EmployeeModify";
import EmployeeDetails from "./views/Employee/EmployeeDetails";

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
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* EMPLOYEE */}
              <Route path="/employee" element={<Employees />} />
              <Route path="/employee-details" element={<EmployeeDetails />} />
              <Route path="/employee-modify" element={<EmployeeModify />} />
              <Route path="/employee-create" element={<EmployeeCreate />} />
              {/* ISSUE */}
              <Route path="/issue" element={<Issues />} />
              {/* TOOL */}
              <Route path="/tool" element={<Tools />} />
              {/* CATEGORY */}
              <Route path="/category" element={<Categories />} />
              {/* INTERVAL */}
              <Route path="/interval" element={<Intervals />} />
              {/* LOCATION */}
              <Route path="/location" element={<Locations />} />
              {/* LOG */}
              <Route path="/log" element={<Logs />} />
              {/* QUALIFICATION */}
              <Route path="/qualification" element={<Qualifications />} />
            </Routes>
          </Layout>
        </MuiPickersUtilsProvider>
      </HeaderProvider>
    </>
  );
}

export default App;
