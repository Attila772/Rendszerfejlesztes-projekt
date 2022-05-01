import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderProvider } from "./components/Layout/HeaderContext";
import Layout from "./components/Layout/Layout";
import useToken from "./shared/network/login.api";
import DateFnsUtils from "@date-io/date-fns";
import PriviligeLevelCreate from "./views/PriviligeLevels/PriviligeLevelCreate";
import Login from "./components/Login/Login";
import LocationModify from "./views/Location/LocationModify";
import PriviligeLevelModify from "./views/PriviligeLevels/PriviligeLevelModify";
import QualificationModify from "./views/Qualification/QualificationModify";
import LogCreate from "./views/Log/LogCreate";
import { hasAuthority } from "./shared/common/authorization";
import { AuthenticatedUser } from "./shared/common/rolePermissions";
import LogModify from "./views/Log/LogModify";

const Dashboard = lazy(() => import("./views/Dashboard"));
const Employees = lazy(() => import("./views/Employee/Employees"));
const EmployeeModify = lazy(() => import("./views/Employee/EmployeeModify"));
const EmployeeCreate = lazy(() => import("./views/Employee/EmployeeCreate"));
const Issues = lazy(() => import("./views/Issue/Issues"));
const IssueModify = lazy(() => import("./views/Issue/IssueModify"));
const IssueCreate = lazy(() => import("./views/Issue/IssueCreate"));
const Tools = lazy(() => import("./views/Tool/Tools"));
const ToolModify = lazy(() => import("./views/Tool/ToolModify"));
const ToolCreate = lazy(() => import("./views/Tool/ToolCreate"));
const Qualifications = lazy(
  () => import("./views/Qualification/Qualifications")
);
const QualificationCreate = lazy(
  () => import("./views/Qualification/QualificationCreate")
);
const Logs = lazy(() => import("./views/Log/Logs"));
const Locations = lazy(() => import("./views/Location/Locations"));
const Categories = lazy(() => import("./views/Category/Categories"));
const CategoryCreate = lazy(() => import("./views/Category/CategoryCreate"));
const CategoryModify = lazy(() => import("./views/Category/CategoryModify"));
const LocationCreate = lazy(() => import("./views/Location/LocationCreate"));
const PriviligeLevels = lazy(
  () => import("./views/PriviligeLevels/PriviligeLevels")
);

function App() {
  const { token, setToken, removeToken, getToken } = useToken();

  /*if (!token) {
    return <Login setToken={setToken} />;
  }*/

  return (
    <>
      <HeaderProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout removeToken={removeToken} token={token}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* EMPLOYEE */}
              <Route path="/employee" element={<Employees token={token} />} />
              <Route path="/employee-modify" element={<EmployeeModify />} />
              <Route path="/employee-create" element={<EmployeeCreate />} />
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "USER_GET"
              ) && <></>}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "USER_ADMIN"
              ) && <></>}
              {/* ISSUE */}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "ISSUE_GET"
              ) && <Route path="/issue" element={<Issues token={token} />} />}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "ISSUE_ADMIN"
              ) && (
                <>
                  <Route path="/issue-create" element={<IssueCreate />} />
                  <Route path="/issue-modify" element={<IssueModify />} />
                </>
              )}
              {/* TOOL */}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "TOOL_GET"
              ) && <Route path="/tool" element={<Tools token={token} />} />}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "TOOL_ADMIN"
              ) && (
                <>
                  <Route path="/tool-create" element={<ToolCreate />} />
                  <Route path="/tool-modify" element={<ToolModify />} />
                </>
              )}
              {/* CATEGORY */}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "CATEGORY_GET"
              ) && (
                <Route
                  path="/category"
                  element={<Categories token={token} />}
                />
              )}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "CATEGORY_ADMIN"
              ) && (
                <>
                  <Route path="/category-create" element={<CategoryCreate />} />
                  <Route path="/category-modify" element={<CategoryModify />} />
                </>
              )}
              {/* LOCATION */}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "LOCATION_GET"
              ) && (
                <Route path="/location" element={<Locations token={token} />} />
              )}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "LOCATION_ADMIN"
              ) && (
                <>
                  <Route path="/location-create" element={<LocationCreate />} />
                  <Route path="/location-modify" element={<LocationModify />} />
                </>
              )}
              {/* LOG */}
              {hasAuthority((token as AuthenticatedUser)?.level, "LOG_GET") && (
                <Route path="/log" element={<Logs token={token} />} />
              )}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "LOG_ADMIN"
              ) && (
                <>
                  <Route path="/log-create" element={<LogCreate />} />
                  <Route path="/log-modify" element={<LogModify />} />
                </>
              )}
              {/* QUALIFICATION */}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "QUALIFICATION_GET"
              ) && (
                <Route
                  path="/qualification"
                  element={<Qualifications token={token} />}
                />
              )}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "QUALIFICATION_ADMIN"
              ) && (
                <>
                  <Route
                    path="/qualification-create"
                    element={<QualificationCreate />}
                  />
                  <Route
                    path="/qualification-modify"
                    element={<QualificationModify />}
                  />
                </>
              )}
              {/* PRIVILIGE LEVELS */}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "ROLE_GET"
              ) && (
                <Route
                  path="/privilige-level"
                  element={<PriviligeLevels token={token} />}
                />
              )}
              {hasAuthority(
                (token as AuthenticatedUser)?.level,
                "ROLE_ADMIN"
              ) && (
                <>
                  <Route
                    path="/priviligelevel-create"
                    element={<PriviligeLevelCreate />}
                  />
                  <Route
                    path="/priviligelevel-modify"
                    element={<PriviligeLevelModify />}
                  />
                </>
              )}
            </Routes>
          </Layout>
        </MuiPickersUtilsProvider>
      </HeaderProvider>
    </>
  );
}

export default App;
