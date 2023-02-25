import React from "react";
import { createHashRouter } from "react-router-dom";
import Remand from "pages/demand/index";

const router = createHashRouter([
  {
    path: "*",
    element: <Remand />
  }
]);

export default router;
