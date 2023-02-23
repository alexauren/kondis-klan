import { Center, createStyles, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'

const useStyles = createStyles(theme => ({
  //create wrappe that spans entire page
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function FullPageLoader() {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Loader size={'xl'} variant="bars" />
    </div>
  )
}

export default FullPageLoader
