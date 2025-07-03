import { createComment } from '@/entities/topic/topic.api'
import { ParentComment } from '@/shared/types/Forum'
import { Button, Input, Modal } from 'antd'
import { Controller, useForm } from 'react-hook-form'

const { TextArea } = Input

interface TopicCreateModalProps {
  visible: boolean
  onClose: () => void
  topicId: number
  parentComment?: ParentComment | null
  onSuccess?: () => void
}

interface FormData {
  content: string
}

export const TopicCreateModal = ({
  visible,
  onClose,
  topicId,
  parentComment = null,
  onSuccess,
}: TopicCreateModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      content: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await createComment(
        {
          content: data.content,
          parentCommentId: parentComment?.id ?? null,
        },
        topicId
      )
      reset()
      onSuccess?.()
      onClose()
    } catch (err) {
      console.error('Ошибка при создании комментария:', err)
    }
  }

  const title = parentComment
    ? `Ответ на комментарий от ${parentComment.authorLogin}`
    : 'Добавить комментарий'

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={() => {
        reset()
        onClose()
      }}
      footer={null}
      destroyOnHidden>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="content"
          control={control}
          rules={{ required: 'Введите текст комментария' }}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={4}
              placeholder="Напишите что-нибудь..."
              status={errors.content ? 'error' : ''}
            />
          )}
        />
        {errors.content && (
          <p style={{ color: 'red', marginTop: 4 }}>{errors.content.message}</p>
        )}

        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          block
          style={{ marginTop: 16 }}>
          Отправить
        </Button>
      </form>
    </Modal>
  )
}
