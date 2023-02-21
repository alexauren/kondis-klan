//create a hook to check if mobile or not

import { useMediaQuery } from '@mantine/hooks'

export function useMobile() {
  const isMobile = useMediaQuery('(max-width: 600px)')
  return isMobile
}
