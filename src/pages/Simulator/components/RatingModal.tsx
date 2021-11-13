import { Form, Input, Modal, notification, Rate } from "antd";
import { useState } from "react";
import api from "../../../api";
import { getMessageFromError } from "../../../utils/utils";

interface RatingModalProps {
  ratingModalVisible: boolean
  setRatingModalVisible: (value: React.SetStateAction<boolean>) => void
  setRated: (value: React.SetStateAction<boolean>) => void
}

export default function RatingModal(props: RatingModalProps) {
  const { ratingModalVisible, setRatingModalVisible, setRated } = props;
  const [rating, setRating] = useState<number>();
  const [comment, setComment] = useState<string>();

  const handleSubmit = async (data: { rating?: number, comment?: string }) => {
    try {
      const response = await api.post("simulatorRating", data);
      if (response.data.success) {
        notification.open({
          message: "Revisión guardada con éxito.",
          type: "success"
        });
        setRatingModalVisible(false);
        setRated(true);
      } else {
        notification.open({
          message: "Ocurrió un error durante la evaluación.",
          description: response.data.message,
          type: "error"
        });
      }
    } catch (error) {
      console.log(error)
      notification.open({
        message: "Ocurrió un error durante la evaluación.",
        description: `Erro: ${getMessageFromError(error)}`,
        type: "error"
      });
    }
  }

  return <Modal
    title="Evaluar el simulador"
    visible={ratingModalVisible}
    okText="Enviar"
    cancelText="Cancelar"
    onCancel={() => setRatingModalVisible(false)}
    onOk={() => handleSubmit({ rating, comment })}
  >
    <Form labelAlign="right" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="Evaluación">
        <Rate onChange={value => setRating(value)} />
      </Form.Item>
      <Form.Item label="Comentarios">
        <Input.TextArea rows={3} onChange={value => setComment(value.target.value)} />
      </Form.Item>
    </Form>
  </Modal>
}