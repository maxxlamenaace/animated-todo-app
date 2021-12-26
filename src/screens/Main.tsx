import React, { useState } from 'react'
import { Icon, VStack, Fab, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'

import Navbar from '../components/Navbar'
import TaskList from '../components/TaskList'
import Masthead from '../components/Masthead'
import { TaskItemData } from '../components/AnimatedTaskItem'
import AnimatedColorBox from '../components/AnimatedColorBox'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial',
    done: false
  }
]

const Main = () => {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const toggleTaskItemHandler = (item: TaskItemData) => {
    setData(previousData => {
      const newData = [...previousData]
      const index = previousData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }

      return newData
    })
  }

  const changeTaskItemSubjectHandler = (
    item: TaskItemData,
    newSubject: string
  ) => {
    setData(previousData => {
      const newData = [...previousData]
      const index = previousData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }

      return newData
    })
  }

  const finishEditingTaskItemHAndler = () => {
    setEditingItemId(null)
  }

  const pressTaskItemLabelHandler = (item: TaskItemData) => {
    setEditingItemId(item.id)
  }

  const removeItemHandler = (item: TaskItemData) => {
    setData(previousData => {
      const newData = previousData.filter(i => i !== item)
      return newData
    })
  }

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead
        title="What's up, Maxime!"
        image={require('../assets/masthead.png')}
      >
        <Navbar />
      </Masthead>

      <VStack
        flex={1}
        space={1}
        mt="-20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        pt="10px"
      >
        <TaskList
          data={data}
          onToggleItem={toggleTaskItemHandler}
          onChangeSubject={changeTaskItemSubjectHandler}
          onFinishEditing={finishEditingTaskItemHAndler}
          onPressLabel={pressTaskItemLabelHandler}
          onRemoveItem={removeItemHandler}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])

          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}

export default Main
