import React, { useCallback } from 'react'
import {
  Box,
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  Divider,
  IconButton,
  useColorModeValue
} from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'

import AnimatedColorBox from './AnimatedColorBox'
import ThemeToggle from './ThemeToggle'
import MenuButton from './MenuButton'

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const currentRoute = state.routeNames[state.index]

  const pressBackButtonHandler = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])

  const pressMenuMainHandler = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])

  const pressMenuAboutHandler = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={pressBackButtonHandler}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-right',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700')
            }}
          />
        </HStack>
        <Avatar
          source={require('../assets/profile-image.png')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />

        <Heading mb={4} size="xl">
          Maxime Beneteau
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={pressMenuMainHandler}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={pressMenuAboutHandler}
          icon="info"
        >
          About
        </MenuButton>
      </VStack>

      <Divider
        marginY={6}
        color={useColorModeValue('blue.800', 'darkBlue.700')}
      />

      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default Sidebar
