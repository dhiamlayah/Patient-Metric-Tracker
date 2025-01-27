import Header from "../components/Header";
import PatientsTable from "../components/PatientsTable";

const AllPatients = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <PatientsTable />
    </div>
  );
};

export default AllPatients;
