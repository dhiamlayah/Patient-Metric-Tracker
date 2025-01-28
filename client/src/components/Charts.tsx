import { useContext, useEffect, useState } from "react";
import TrendChart from "./TrendChart";
import { Col } from "react-bootstrap";
import {
  AvgMetricA1c,
  AvgMetricBloodPressure,
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";
import BarChartComponent from "./BarChar";
import { GlobalUpdateContext } from "./Dashboard";
import { getAvrageOfA1cByMonths } from "../services/metric-a1c";
import { getAvrageOfBloodPressureByMonths } from "../services/metric-blood-pressure";
import {
  concatYearWithMonthA1c,
  concatYearWithMonthBP,
} from "../utils/concatYearWithMonth";
import ListShow from "./ListShow";

interface Props {
  patientMetricBP: PatientMetricBloodPressure[] | undefined;
  patientMetricA1c: PatientMetricA1c[] | undefined;
}

const Charts = ({ patientMetricBP, patientMetricA1c }: Props) => {
  const { patientId } = useContext(GlobalUpdateContext);
  const [show, setShow] = useState<{ type: string; name: string }>({
    type: "curve",
    name: "B-P",
  });

  const [avgMetricA1c, setAvgMetricA1C] = useState<AvgMetricA1c[]>([]);
  const [avgMetricBP, setAvgMetricBP] = useState<AvgMetricBloodPressure[]>([]);

  const fetchAvrMetricA1C = async (id: number) => {
    let avgA1c = await getAvrageOfA1cByMonths(id);
    avgA1c = concatYearWithMonthA1c(avgA1c);
    setAvgMetricA1C(avgA1c);
  };
  const fetchAvrMetricBP = async (id: number) => {
    let avgBP = await getAvrageOfBloodPressureByMonths(id);
    avgBP = concatYearWithMonthBP(avgBP);
    setAvgMetricBP(avgBP);
  };

  useEffect(() => {
    fetchAvrMetricA1C(patientId);
    fetchAvrMetricBP(patientId);
  }, []);

  return (
    <>
      <Col key={4}>
        {show.name === "B-P" && show.type === "curve" ? (
          <TrendChart
            name="Blood Pressur Historic"
            data={patientMetricBP}
            metrics={["systolic", "diastolic"]}
          />
        ) : show.name === "A1C" && show.type === "curve" ? (
          <TrendChart
            name="A1C Historic"
            data={patientMetricA1c}
            metrics={["value"]}
          />
        ) : show.name === "A1C" && show.type === "bar" ? (
          <BarChartComponent
            name="A1C Average"
            data={avgMetricA1c}
            metrics={["average_value"]}
          />
        ) : (
          <BarChartComponent
            name="Blood Pressur Average"
            data={avgMetricBP}
            metrics={["average_diastolic", "average_systolic"]}
          />
        )}
      </Col>

      <Col key={5} md={1}>
        <ListShow setShow={setShow} show={show} />
      </Col>
    </>
  );
};

export default Charts;
