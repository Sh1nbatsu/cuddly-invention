import { createTopic } from '@/entities/topic/topic.api'
import { TopicSchemaData } from '@/entities/topic/topic.types'
import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { Button } from 'antd'
import { useFormContext } from 'react-hook-form'

export const TopicForm = () => {
  const { handleSubmit, reset, control } = useFormContext<TopicSchemaData>()

  const onSubmit = async (data: TopicSchemaData) => {
    await createTopic(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <FormInput
        name="title"
        label="Заголовок"
        control={control}
        inputProps={{
          placeholder: 'Введите заголовок топика',
        }}
      />
      <FormInput
        name="description"
        label="Описание"
        control={control}
        inputProps={{
          placeholder: 'Введите описание топика',
          type: 'textArea',
        }}
      />
      <Button htmlType="submit" block size="large">
        Создать топик
      </Button>
    </form>
  )
}
