import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import WinterStays from "./pages/WinterStays";
import Experiences from "./pages/Experiences";
import Offers from "./pages/Offers";
import PropertyDetail from "./pages/PropertyDetail";
import ListProperty from "./pages/ListProperty";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/stays" element={<WinterStays />} />
        <Route path="/stays/:id" element={<PropertyDetail />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/list-property" element={<ListProperty />} />
      </Route>
    </Routes>
  );
}
