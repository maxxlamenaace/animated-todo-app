import React, { useCallback } from 'react'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import { View } from 'moti'

import TaskItem from './TaskItem'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)

export interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
  } = props

  const toggleCheckboxHandler = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const changeSubjectHandler = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )

  const finishEditingHandler = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])

  const pressLabelHandler = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const removeHandler = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={toggleCheckboxHandler}
        onChangeSubject={changeSubjectHandler}
        onFinishEditing={finishEditingHandler}
        onPressLabel={pressLabelHandler}
        onRemove={removeHandler}
      />
    </StyledView>
  )
}

export default AnimatedTaskItem
