import { createComment } from '@/entities/topic/topic.api'
import { ForumComment } from '@/shared/types/Forum'
import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'

const { TextArea } = Input

interface TopicCreateModalProps {
  visible: boolean
  onClose: () => void
  topicId: number
  parentComment?: ForumComment | null
  onSuccess?: () => void
}

export const TopicCreateModal = ({
  visible,
  onClose,
  topicId,
  parentComment = null,
  onSuccess,
}: TopicCreateModalProps) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      await createComment(
        {
          content: values.content,
          parentCommentId: parentComment?.id ?? null,
        },
        topicId
      )

      form.resetFields()
      onSuccess?.()
      onClose()
    } catch (err) {
      console.error('Ошибка при создании комментария:', err)
    } finally {
      setLoading(false)
    }
  }

  const title = parentComment
    ? `Ответ на комментарий от ${parentComment.author.login}`
    : 'Добавить комментарий'

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="content"
          label="Комментарий"
          rules={[{ required: true, message: 'Введите текст комментария' }]}>
          <TextArea rows={4} placeholder="Напишите что-нибудь..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
