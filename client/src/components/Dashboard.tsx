import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getAllPatientA1c } from "../services/metric-a1c";
import { getPatient } from "../services/patients";
import { getAllPatientBloodPressure } from "../services/metric-blood-pressure";
import MetricsTable from "./MetricTable";
import AllMetricCard from "./AllMetricCard";
import {
  Patient,
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";
import UpdateA1c from "./UpdateA1c";
import UpdateBP from "./UpdateBP";
import Charts from "./Charts";

export const GlobalUpdateContext = createContext({
  handleShowUpdate: (name: string) => {} , patientId : 0
});

function Dashboard() {
  const [rerender,setRerender]=useState(false)       // this will rerender the data each time we add new values
  const [getMoreA1C,setGetMoreA1C]=useState(false)   // this will rerender the data each time we add new values
  const [getMoreBP,setGetMoreBP]=useState(false)     // this will rerender the data each time we add new values
  const [showA1c, setShowA1c] = useState(false);     // open box modal to add new A1C measure
  const [showBP, setShowBP] = useState(false);       // open box modal to add new blood pressure measure
  const [nbrA1c,setNbrA1C]=useState<number>(0)       // all number of patient A1C exist in the database 
  const [nbrBP,setNbrBP]=useState<number>(0)         // all number of patient BP exist in the database

  const [patientMetricA1c, setPatientMetricA1C] =useState<PatientMetricA1c[]>([]);
  const [patientMetricBP, setPatientMetricBP] =useState<PatientMetricBloodPressure[]>([]);
  const [patient, setPatient] = useState<Patient>();

  const params = useParams();
  const patientId = params.id ? +params.id : 0 ;

  // this fuction is responsible to which update box should we open 
  const handleShowUpdate = (name: string) => {
    if(name === "A1c"){
      setShowA1c(true) 
      setShowBP(false)}
    else if (name=="BP"){
      setShowA1c(false) 
      setShowBP(true)
    }else{
      setShowA1c(false) 
      setShowBP(false)
    }
  };

  // send a request to get A1C historic
  const fetchPatientA1cData = async (id: number,skip?:number) => {
    try {
      if(!skip){
        const [allPatientAtc,totalNbr] = await getAllPatientA1c(id);
        setNbrA1C(totalNbr)
        setPatientMetricA1C(allPatientAtc);
      }else{
        const addMorePatientAtc = await getAllPatientA1c(id,skip);
        setPatientMetricA1C((prev)=>{return [...prev,...addMorePatientAtc[0]]})
      }
    } catch (error: any) {
      toast.error("Can't fetch Patient A1C measures ");
    }
  };

  // send a request to get Blood Pressure historic
  const fetchPatientBloodPressurData = async (id: number,skip?:number) => {
    try {
      if(!skip){
        const [allPatientBP,totalNbr] = await getAllPatientBloodPressure(id);
        setNbrBP(totalNbr)
        setPatientMetricBP(allPatientBP);
      }else{
        const addMorePatientBP = await getAllPatientBloodPressure(id,skip);
        setPatientMetricBP((prev)=>{return [...prev,...addMorePatientBP[0]]})
      }
    } catch (error: any) {
      toast.error("Can't fetch Patient Blood Pressure measures ");
    }
  };

  // send a request to get Patient with last measure of A1C and Blood-presseur
  const fetchPatient = async (id: number) => {
    try {
      const patientData = await getPatient(id);
      setPatient(patientData);
    } catch (error: any) {
      setPatient({
        username: "UserNotFound",
        metricA1c: [],
        metricBloodPressure: [],
      });
      toast.error("Can't fetch Patient");
    }
  };


  //Initial Fetching Data
  useEffect(() => {
      fetchPatient(patientId);
      fetchPatientA1cData(patientId);
      fetchPatientBloodPressurData(patientId);
  }, [rerender]);

  //Fetching more A1C Data 
  useEffect(()=>{
      const skip = patientMetricA1c.length
      fetchPatientA1cData(patientId,skip);
  },[getMoreA1C])

  //Fetching more A1C Data 
  useEffect(()=>{
      const skip = patientMetricBP.length
      fetchPatientBloodPressurData(patientId,skip);
  },[getMoreBP])


  return (
    <GlobalUpdateContext.Provider value={{ handleShowUpdate , patientId }}>
      <Container className="mt-4">
        <h1 className="mb-4">Patient Metric Tracker</h1>

        {patient && (
          <Row>
            <AllMetricCard patient={patient} />
          </Row>
        )}

        <Row>
          <Charts
            patientMetricBP={patientMetricBP}
            patientMetricA1c={patientMetricA1c}
          />
        </Row>


        <Row>
          <Col key={1} md={6}>
            <MetricsTable name="Blood Pressur" data={patientMetricBP} nbrData={nbrBP} getMore={setGetMoreBP} />
          </Col>
          <Col key={2} md={4}>
            <MetricsTable name="A1C" data={patientMetricA1c} nbrData={nbrA1c}  getMore={setGetMoreA1C}/>
          </Col>
        </Row>
      </Container>
   

  
      {showBP && (
        <UpdateBP  showBP={showBP}  setRerender={setRerender}/>
      )}
      {showA1c && (
        <UpdateA1c showA1c={showA1c}  setRerender={setRerender}/>
      )}

      <ToastContainer />
    </GlobalUpdateContext.Provider>
  );
}

export default Dashboard;
