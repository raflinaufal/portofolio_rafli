import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { toggleTheme, setTheme } from '@/lib/slices/themeSlice'

export function useTheme() {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const toggle = () => dispatch(toggleTheme())
  const setDark = () => dispatch(setTheme(true))
  const setLight = () => dispatch(setTheme(false))

  return {
    isDarkMode,
    toggle,
    setDark,
    setLight,
  }
} 