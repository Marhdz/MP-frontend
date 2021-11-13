import { ClearOutlined, SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, InputNumber, Menu, Select, Space, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
import { SimulationData } from "../../../utils/types";
import { algorithmList, algorithmNamesList } from "../../../utils/algorithmList";
import { setPagesQueue, setMemoryInitialState, setTau, setRandomValues, setActionsQueue, setClockInterruption } from "../../../utils/generateRandomData";
import { setTestCaseValues } from "../../../utils/testCases";

export interface SimulationFormProps {
  form: FormInstance<SimulationData>,
  onSubmit?: (data: SimulationData) => void,
}

export default function SimulationForm(props: SimulationFormProps) {
  const { form, onSubmit } = props

  const algorithmsOptions = algorithmList.map(cur => { return <Select.Option value={cur.name} key={cur.name}>{cur.label}</Select.Option> })

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>()
  const [formSubmitLoading, setFormSubmitLoading] = useState(false)
  const [selectedTestCase, setSelectedTestCase] = useState<string>("")
  const [firstRender, setFirstRender] = useState<boolean>(true);

  if (firstRender) {
    setSelectedAlgorithms(algorithmNamesList)
    setFirstRender(false);
  }

  useEffect(() => {
    setTestCaseValues(form, selectedTestCase)
  }, [selectedTestCase, form])

  const onReset = () => {
    form.resetFields();
    setSelectedTestCase("")
  };

  const handleSubmit = async () => {
    if (formSubmitLoading) return
    setFormSubmitLoading(true)
    form.validateFields().then(values => {
      onSubmit && onSubmit({
        algorithms: values.algorithms,
        memoryInitalState: values.memoryInitalState,
        memorySize: values.memorySize,
        numberOfPages: values.numberOfPages,
        pages: values.pages,
        pagesQueue: values.pagesQueue,
        actionsQueue: values.actionsQueue,
        pagesQueueSize: values.pagesQueueSize,
        clockInterruption: values.clockInterruption,
        tau: values.tau,
      })
      setFormSubmitLoading(false)
    })
  }

  const testCasesMenu = (
    <Menu selectedKeys={[selectedTestCase]} onClick={(e) => setSelectedTestCase(e.key)} >
      <Menu.Item key="testCase1" >Caso de prueba 1</Menu.Item>
      <Menu.Item key="testCase2" >Caso de prueba 2</Menu.Item>
      <Menu.Item key="testCase3" >Caso de prueba 3</Menu.Item>
    </Menu>
  )

  return <Form
    labelAlign="right"
    initialValues={{ algorithms: algorithmNamesList }}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    onFinish={handleSubmit}
  >
    <Form.Item
      label="Tamaño de la memoria"
      key="memorySize"
      name="memorySize"
      tooltip="Cuántos procesos caben en la memoria."
      rules={[{ required: true, message: " Ingrese el tamaño de la memoria" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Tamaño de cola de página"
      key="pagesQueueSize"
      name="pagesQueueSize"
      tooltip="Tamaño de la cola de páginas a las que se hará referencia."
      rules={[{ required: true, message: "Ingrese el tamaño de la cola de páginas" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Número de páginas"
      key="numberOfPages"
      name="numberOfPages"
      tooltip="Número de páginas únicas."
      rules={[{ required: true, message: "Ingrese el número de páginas únicas" }]}
    >
      <InputNumber style={{ width: "100%" }} type="number" />
    </Form.Item>

    <Form.Item
      label="Páginas"
      key="pages"
      name="pages"
      tooltip="Nombres de páginas."
      rules={[{ required: true, message: "Ingrese los nombres de las páginas" }]}
    >
      <Select mode="tags" tokenSeparators={[","]} allowClear style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Cola de páginas"
      key="pagesQueue"
      name="pagesQueue"
      tooltip="Cola de páginas a referenciar."
      rules={[{ required: true, message: "Ingrese la cola de páginas a referenciar" }]}
    >
      <Input addonAfter={
        <Tooltip title="Generar automáticamente. Depende de los campos 'Tamaño de cola de página' y 'Páginas'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setPagesQueue(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Cola de acciones"
      key="actionsQueue"
      name="actionsQueue"
      tooltip="Cola de acciones a realizar para cada página (escribir (E) o leer (L))"
      rules={[{ required: true, message: "Ingrese la cola de acciones a realizar para cada página (escribir (E) o leer (L))" }]}
    >
      <Input addonAfter={
        <Tooltip title="Generar automáticamente. Depende del campo 'Tamaño de cola de página'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setActionsQueue(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="Estado inicial de la memoria"
      key="memoryInitalState"
      name="memoryInitalState"
      tooltip="Páginas que ya están en la memoria."
      rules={[{ required: true, message: "Ingrese las páginas que ya están en la memoria" }]}
    >
      <Input addonAfter={
        <Tooltip title="Generar automáticamente. Depende de los campos 'Tamaño de memoria' y 'Páginas'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setMemoryInitialState(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} />
    </Form.Item>

    {!!(selectedAlgorithms?.includes("nruAlgorithm") || selectedAlgorithms?.includes("secondChanceAlgorithm") || selectedAlgorithms?.includes("wsClockAlgorithm")) && <Form.Item
      label="interrupción del reloj"
      key="clockInterruption"
      name="clockInterruption"
      tooltip="¿Cuántas referencias de página habrá en una interrupción del reloj?"
      rules={[{ required: true, message: "Ingrese cuántas referencias de página habrá una interrupción del reloj" }]}
    >
      <Input addonAfter={
        <Tooltip title="Generar automáticamente. Depende del campo 'Tamaño de cola de página'.">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setClockInterruption(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} type="number" />
    </Form.Item>}

    {!!(selectedAlgorithms?.includes("wsClockAlgorithm")) && <Form.Item
      label="τ (tau)"
      key="tau"
      name="tau"
      tooltip="Edad máxima para considerar una página dentro del conjunto de trabajo."
      rules={[{ required: true, message: "Ingrese la edad máxima para considerar una página dentro del conjunto de trabajo" }]}
    >
      <Input addonAfter={
        <Tooltip title="Generar automáticamente">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => setTau(form)}
          />
        </Tooltip>
      } style={{ width: "100%" }} type="number" />
    </Form.Item>}

    <Form.Item
      label="Algoritmos"
      key="algorithms"
      name="algorithms"
      tooltip="Algoritmos a ejecutar."
      rules={[{ required: true, message: "Seleccionar algoritmos" }]}
    >
      <Select mode="multiple" style={{ width: "100%" }} defaultValue={algorithmNamesList} onChange={(value: string[]) => setSelectedAlgorithms(value)}>
        {algorithmsOptions}
      </Select>
    </Form.Item>

    <Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />}>Simular</Button>
       
        <Dropdown.Button overlay={testCasesMenu} type="dashed">Usar caso de prueba</Dropdown.Button>
       
        <Button type="dashed" htmlType="button" icon={<SettingOutlined />} onClick={() => setRandomValues(form, setSelectedAlgorithms)}>Generar datos aleatorios</Button>
        <Button type="dashed" htmlType="button" icon={<ClearOutlined />} onClick={onReset}>Limpiar</Button>
      </Space>
    </Form.Item>
  </Form>
}
