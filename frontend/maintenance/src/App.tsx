import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderProvider } from "./components/Layout/HeaderContext";
import Layout from "./components/Layout/Layout";
import useToken from "./shared/network/login.api";
import DateFnsUtils from "@date-io/date-fns";
import PriviligeLevelCreate from "./views/PriviligeLevels/PriviligeLevelCreate";
import ToolCreate from "./views/Tool/ToolCreate";

const Dashboard = lazy(() => import("./views/Dashboard"));
const Employees = lazy(() => import("./views/Employee/Employees"));
const Issues = lazy(() => import("./views/Issue/Issues"));
const Tools = lazy(() => import("./views/Tool/Tools"));
const EmployeeModify = lazy(() => import("./views/Employee/EmployeeModify"));
const EmployeeCreate = lazy(() => import("./views/Employee/EmployeeCreate"));
const Qualifications = lazy(() => import("./views/Qualification/Qualifications"));
const Logs = lazy(() => import("./views/Log/Logs"));
const Locations = lazy(() => import("./views/Location/Locations"));
const Intervals = lazy(() => import("./views/Interval/Intervals"));
const Categories = lazy(() => import("./views/Category/Categories"));
const LocationCreate = lazy(() => import("./views/Location/LocationCreate"));
const PriviligeLevels = lazy(() => import("./views/PriviligeLevels/PriviligeLevels"));

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
              {/* EMPLOYEE */}
              <Route path="/employee" element={<Employees />} />
              <Route path="/employee-modify" element={<EmployeeModify />} />
              <Route path="/employee-create" element={<EmployeeCreate />} />
              {/* ISSUE */}
              <Route path="/issue" element={<Issues />} />
              {/* TOOL */}
              <Route path="/tool" element={<Tools />} />
              <Route path="/tool-create" element={<ToolCreate />} />
              {/* CATEGORY */}
              <Route path="/category" element={<Categories />} />
              {/* INTERVAL */}
              <Route path="/interval" element={<Intervals />} />
              {/* LOCATION */}
              <Route path="/location" element={<Locations />} />
              <Route path="/location-create" element={<LocationCreate />} />
              {/* LOG */}
              <Route path="/log" element={<Logs />} />
              {/* QUALIFICATION */}
              <Route path="/qualification" element={<Qualifications />} />
              {/* PRIVILIGE LEVELS */}
              <Route path="/priviligelevel" element={<PriviligeLevels />} />
              <Route path="/priviligelevel-create" element={<PriviligeLevelCreate />} />
            </Routes>
          </Layout>
        </MuiPickersUtilsProvider>
      </HeaderProvider>
    </>
  );
}

export default App;
