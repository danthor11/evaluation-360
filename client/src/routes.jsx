import { createBrowserRouter } from "react-router-dom";
import { Evaluations } from "./pages/Employee/Evaluations";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Index as EvaluationsPage } from "./pages/Evaluations/Index";
import { Response } from "./pages/Evaluations/Response";
import { Create } from "./pages/Evaluations/Create";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Report } from "./pages/Employee/Report";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <div>Hello world!</div>
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },

  {
    path: "/employee/:id",
    element: (
      <ProtectedRoute to="/login">
        <Layout>
          <Evaluations />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: " /employee/:id/:evaluation_id",
    element: (
      <ProtectedRoute to="/login">
        <Layout>
          <Report />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/evaluations",
    element: (
      <ProtectedRoute to="/login">
        <Layout>
          <EvaluationsPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/evaluations/create",
    element: (
      <ProtectedRoute to="/login">
        <Layout>
          <Create />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/evaluations/:id",
    element: (
      <ProtectedRoute to="/login">
        <Layout>{/* <Evaluations /> */}</Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/evaluations/response/:id",
    element: (
      <ProtectedRoute to="/login">
        <Layout>
          <Response />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute to="/login">
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile",
    element: <Layout></Layout>,
  },
]);
