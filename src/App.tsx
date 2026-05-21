import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Listing from "./routes/Home/Listing";
import Form from "./routes/Home/Form";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={<Listing />} />
        <Route path='animais/:animalId' element={<Form />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}
