import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Patient from "./pages/Patient";
import AllPatients from "./pages/AllPatients";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/patients/:id" element={<Patient />} />
        <Route path="/patients" element={<AllPatients/>}/>
      </Routes>
    </Router>
  );
}

export default App;
