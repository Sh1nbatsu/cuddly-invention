import { useForumLogic } from '@/entities/forum/forum.hooks'
import { CreateFormNoteData } from '@/entities/forum/forum.types'
import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { Button } from 'antd'
import { useFormContext } from 'react-hook-form'
import { CardContainer } from './forum-card.styled'

export const ForumCard = () => {
  const { handleSubmit, control } = useFormContext<CreateFormNoteData>()
  const { handleCreateTopic } = useForumLogic()
  return (
    <CardContainer title="Создать тему">
      <form onSubmit={handleSubmit(handleCreateTopic)}>
        <FormInput
          control={control}
          name="title"
          label="Заголовок"
          rules={{ required: 'Введите заголовок темы' }}
          inputProps={{ placeholder: 'Заголовок темы' }}
        />
        <FormInput
          control={control}
          name="text"
          label="Содержимое темы"
          inputProps={{ placeholder: 'Содержимое темы' }}
          rules={{ required: 'Введите содержимое темы' }}
        />
        <div style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Создать
          </Button>
        </div>
      </form>
    </CardContainer>
  )
}
