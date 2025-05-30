// topic-reply-form.ui.tsx
import { useTopic } from '@/entities/topic/topic.hooks'
import { Button, Input, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'

const { Text } = Typography

interface Props {
  pid: number
}

export const TopicReplyForm = ({ pid }: Props) => {
  const { addReply, setReplyTarget } = useTopic()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ text: string }>()

  const submit = ({ text }: { text: string }) => {
    addReply(text, pid)
    reset()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(submit)()
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} style={{ marginTop: 8 }}>
      <Controller
        name="text"
        control={control}
        rules={{ required: 'Введите текст ответа' }}
        render={({ field }) => (
          <Input.TextArea
            {...field}
            autoSize
            placeholder="Ваш ответ…"
            onKeyDown={onKeyDown}
            autoFocus
          />
        )}
      />
      {errors.text && <Text type="danger">{errors.text.message}</Text>}
      <div style={{ marginTop: 8 }}>
        <Button type="primary" htmlType="submit" size="small">
          Ответить
        </Button>
        <Button
          size="small"
          style={{ marginLeft: 8 }}
          onClick={() => setReplyTarget(null)}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
