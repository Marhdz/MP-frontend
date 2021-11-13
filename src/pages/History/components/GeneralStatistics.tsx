import { MonitorOutlined, HourglassOutlined } from "@ant-design/icons";
import { Col, Card, Statistic, notification } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";
import { formatSimulationTime } from "../../../utils/calculations";
import { SimulationStats } from "../../../utils/types";
import { getMessageFromError } from "../../../utils/utils";

export default function GeneralStatistics() {
  const [response, setResponse] = useState<SimulationStats>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("simulationStats")
      .then(response => {
        setResponse(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        notification.open({
          message: "Se produjo un error al consultar los datos.",
          description: `Error: ${getMessageFromError(error)}`,
          type: "error"
        })
      });
  }, []);

  return <>
    <Col span={10}>
      <Card bordered={false}>
        <Statistic
          title="Total de simulaciones realizadas"
          value={response?.data?.totalOfSimulations}
          prefix={<MonitorOutlined />}
          suffix={"simulaciones"}
          loading={loading}
        />
      </Card>
    </Col>
    <Col span={10}>
      <Card bordered={false}>
        <Statistic
          title="Tiempo total dedicado a las simulaciones realizadas"
          value={formatSimulationTime(response?.data?.totalOfTime || 0).simulationTime}
          prefix={<HourglassOutlined />}
          suffix={formatSimulationTime(response?.data?.totalOfTime || 0).suffix}
          loading={loading}
        />
      </Card>
    </Col>
  </>
}