import express from 'express'

const app = express()

app.use(express.json())

app.get('/api/configuration', async (_, res) => {
  await sleep()

  res.json({
    data: 'some-configuration-data-from-backend',
  })
})

app.post('/api/login', async (req, res) => {
  await sleep()

  if (!req.body.username || !req.body.password) {
    res.status(403).json({
      validationErrors: [
        {
          message: 'Username and password must not be empty!',
        },
      ],
    })
    return
  }

  const token = 'some-auth-token'
  res.json({
    token,
    status: 200,
  })
})

function sleep(time = 1000) {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}

app.listen(80, () => {
  console.log('Server is listening on 80...')
})

export { app }
