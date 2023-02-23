import { createStyles } from '@mantine/core'

const useStyles = createStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    color: theme.colors.gray[5],
    textTransform: 'uppercase',
  },
}))

function FullPageError() {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <h1>Error</h1>
    </div>
  )
}

export default FullPageError
