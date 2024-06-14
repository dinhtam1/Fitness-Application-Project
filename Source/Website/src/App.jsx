import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/Routers";

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
