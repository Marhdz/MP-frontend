import { Modal, Space, Timeline, Typography } from "antd";

interface HelpModalProps {
  helpModalVisible: boolean
  setHelpModalVisible: (value: React.SetStateAction<boolean>) => void
}

export default function HelpModal(props: HelpModalProps) {
  const { helpModalVisible, setHelpModalVisible } = props;
  return <Modal
    title="Ayuda con el simulador"
    visible={helpModalVisible}
    footer={null}
    onCancel={() => setHelpModalVisible(false)}
  >
    <Timeline>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Primero, complete los datos para la simulación</Typography.Text>
          <span>Los campos "Cola de páginas", "Cola de acciones", "Estado de memoria inicial", "Interrupción del reloj" y "τ (tau)" se pueden generar automáticamente.</span>
          <span>El campo "Clock Interrupt" solo se utiliza cuando se seleccionan los algoritmos "NRU", "Second Chance" o "WS-Clock".</span>
          <span>El campo "τ (tau)" se usa solo cuando se selecciona el algoritmo "WS-Clock".</span>
        </Space>
      </Timeline.Item>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Botones extra.</Typography.Text>
          <span>Genere datos aleatorios: si lo desea, puede generar datos aleatorios para la simulación</span>
          <span>Borrar: borra todos los datos del formulario.</span>
        </Space>
      </Timeline.Item>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Después de hacer clic en "Simular", espere unos momentos.</Typography.Text>
          <span>Dependiendo de la cantidad de datos, la simulación puede tardar un poco.</span>
          <span>Debido al sitio de alojamiento utilizado, la API de simulación "duerme" después de 30 minutos de inactividad. En este caso, es habitual que el proceso de simulación tarde un poco más, ya que hay que esperar a que la API vuelva a empezar.</span>
        </Space>
      </Timeline.Item>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Resultados</Typography.Text>
          <span>Si el tamaño de la memoria es menor o igual a 5, el número de páginas es menor o igual a 10 y el tamaño de la cola de páginas es menor o igual a 50, se mostrarán los detalles de la simulación, disponibles al final de la página. .</span>
        </Space>
      </Timeline.Item>
    </Timeline>
  </Modal>
}