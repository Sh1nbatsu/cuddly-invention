import { useTopic } from '@/entities/topic/topic.hooks'
import { Button, Card, Input, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'

const { Text } = Typography

export const TopicForm = () => {
  const { addPlain } = useTopic()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ text: string }>()

  const submit = ({ text }: { text: string }) => {
    addPlain(text)
    reset()
  }

  return (
    <Card title="Добавить комментарий" style={{ width: '100%', marginTop: 32 }}>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="text"
          control={control}
          rules={{ required: 'Введите текст комментария' }}
          render={({ field }) => (
            <Input.TextArea rows={4} placeholder="Введите текст…" {...field} />
          )}
        />
        {errors.text && <Text type="danger">{errors.text.message}</Text>}
        <div style={{ marginTop: 12 }}>
          <Button type="primary" htmlType="submit" block>
            Отправить
          </Button>
        </div>
      </form>
    </Card>
  )
}
