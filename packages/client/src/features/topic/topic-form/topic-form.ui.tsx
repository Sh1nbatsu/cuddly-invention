import { TopicSchemaData } from '@/entities/topic/topic.types'
import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { Button } from 'antd'
import { useFormContext } from 'react-hook-form'
import { LabelStyle } from '@/entities/session/session.styled'

interface TopicFormProps {
  onSubmit: (data: TopicSchemaData) => void
}

export const TopicForm = ({ onSubmit }: TopicFormProps) => {
  const { handleSubmit, control } = useFormContext<TopicSchemaData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <FormInput
        name="title"
        label={<LabelStyle>Заголовок</LabelStyle>}
        control={control}
        inputProps={{
          placeholder: 'Введите заголовок топика',
        }}
      />
      <FormInput
        name="description"
        label={<LabelStyle>Описание</LabelStyle>}
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
