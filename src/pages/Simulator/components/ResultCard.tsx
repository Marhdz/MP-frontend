import { HourglassOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Descriptions, Divider, Statistic } from "antd";
import BarChart from "../../../components/charts/BarChart";
import { SimulationData, SimulationResponse } from "../../../utils/types";
import { formatNumber, formatSimulationTime } from "../../../utils/calculations";
import { pretifyAlgorithmName } from "../../../utils/pretifyStrings";
import DetailsTable from "./DetailsTable";
import PizzaChart from "../../../components/charts/PizzaChart";

export interface ResultCardProps {
  result: SimulationResponse,
  simulationData: SimulationData
}

export default function ResultCard(props: ResultCardProps) {
  const { result, simulationData } = props
  const faultAxis = ["Algoritmo", "Faltas de página"]
  const faultData = result?.algorithmResult?.map(cur => { return { name: pretifyAlgorithmName(cur.name), cont: cur.cont } })
  const timeData = result?.algorithmResult?.map(cur => { return { name: pretifyAlgorithmName(cur.name), cont: cur.simulationTime } }).filter(cur => cur.cont > 0)
  const { simulationTime, suffix } = formatSimulationTime(result?.simulationTotalTime || 0)

  return <>
    <Col span={20}>
      <Card bordered={false}>
        <Statistic
          title="Tiempo de simulación"
          value={formatNumber(simulationTime)}
          prefix={<HourglassOutlined />}
          suffix={suffix}
        />
      </Card>
    </Col>
    <Col span={20}>
      <Card bordered={false} title="Total de páginas perdidas por algoritmo">
        <Descriptions size="small">
          {result?.algorithmResult?.map(cur => <Descriptions.Item label={pretifyAlgorithmName(cur.name)}>{cur.cont}</Descriptions.Item>)}
        </Descriptions>
        <Divider />
        <BarChart suffix={"perdidas"} axis={faultAxis} data={faultData || []} />
      </Card>
    </Col>
    {timeData?.length ? <Col span={20}>
      <Card bordered={false} title="Tiempo de ejecución de cada algoritmo (en milisegundos)">
        <Descriptions size="small">
          {result?.algorithmResult?.map(cur => <Descriptions.Item label={pretifyAlgorithmName(cur.name)}>{cur.simulationTime}</Descriptions.Item>)}
        </Descriptions>
        <Divider />
        <PizzaChart suffix={"milisegundos"} data={timeData || []} />
      </Card>
    </Col> : null}
    <Col span={20}>
      <Card bordered={false} title="Datos utilizados en simulación">
        <Descriptions size="small" labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item label="Tamaño de la memoria">{simulationData.memorySize}</Descriptions.Item>
          <Descriptions.Item label="Tamaño de cola de página">{simulationData.pagesQueueSize}</Descriptions.Item>
          <Descriptions.Item label="Número de páginas">{simulationData.numberOfPages}</Descriptions.Item>
          <Descriptions.Item label="Páginas">{simulationData.pages?.join("|")}</Descriptions.Item>
          <Descriptions.Item label="Cola de páginas">{simulationData.pagesQueue}</Descriptions.Item>
          <Descriptions.Item label="Cola de acciones">{simulationData.actionsQueue}</Descriptions.Item>
          <Descriptions.Item label="Estado inicial de la memoria">{simulationData.memoryInitalState}</Descriptions.Item>
          <Descriptions.Item label="Interrupción del reloj">{simulationData.clockInterruption}</Descriptions.Item>
          <Descriptions.Item label="τ (tau)">{simulationData.tau}</Descriptions.Item>
          <Descriptions.Item label="Algoritmos">{simulationData.algorithms?.map(cur => pretifyAlgorithmName(cur)).join(", ")}</Descriptions.Item>
        </Descriptions>
      </Card>
      {result?.shouldShowDetails ? <Card bordered={false} title="Detalles de la ejecución de los algoritmos">
        <Collapse accordion ghost >
          {result?.algorithmResult?.map((cur, i) => <Collapse.Panel header={pretifyAlgorithmName(cur.name)} key={i} >
            <DetailsTable simulationExecution={cur.simulationExecution} />
          </Collapse.Panel>
          )}
        </Collapse>
      </Card> : null}
    </Col>

  </>
}