import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentForm from "./routes/StudentForm";
import StudentList from "./routes/StudentList";
import StudentEdit from "./routes/StudentEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "students",
        element: <StudentList />,
      },
      {
        path: "add",
        element: <StudentForm />,
      },
      {
        path: "edit/:id",
        element: <StudentEdit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
