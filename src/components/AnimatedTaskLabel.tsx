import React, { useEffect, memo } from 'react'
import { Pressable } from 'react-native'
import { Text, HStack, Box } from 'native-base'

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'

interface Props {
  strikeThrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const AnimatedTaskLabel = memo((props: Props) => {
  const { strikeThrough, textColor, inactiveTextColor, onPress, children } =
    props

  const hStackOffset = useSharedValue(0)
  const hStackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hStackOffset.value }]
    }),
    [strikeThrough]
  )

  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  const strikeThroughWidth = useSharedValue(0)
  const strikeThroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikeThroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikeThrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikeThrough) {
      hStackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      )

      textColorProgress.value = withDelay(
        500,
        withTiming(1, { duration: 400, easing })
      )

      strikeThroughWidth.value = withTiming(1, { duration: 400, easing })
    } else {
      textColorProgress.value = withTiming(0, { duration: 400, easing })
      strikeThroughWidth.value = withTiming(0, { duration: 400, easing })
    }
  })

  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems="center" style={[hStackAnimatedStyles]}>
        <AnimatedText
          fontSize={19}
          noOfLines={1}
          isTruncated
          px={1}
          style={[textColorAnimatedStyles]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          position="absolute"
          h={1}
          borderBottomWidth={1}
          style={[strikeThroughAnimatedStyles]}
        />
      </AnimatedHStack>
    </Pressable>
  )
})

export default AnimatedTaskLabel
