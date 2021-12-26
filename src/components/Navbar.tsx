import React, { useCallback } from 'react'
import { HStack, IconButton } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const Navbar = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const pressMenuButtonHandler = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return (
    <HStack w="full" h={40} alignItems="center" alignContent="center" p={4}>
      <IconButton
        onPress={pressMenuButtonHandler}
        borderRadius={100}
        _icon={{
          as: Feather,
          name: 'menu',
          size: 6,
          color: 'white'
        }}
      />
    </HStack>
  )
}

export default Navbar
