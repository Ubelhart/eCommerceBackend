process.on('message', ({ cant }) => {
  const parseCant = parseInt(cant) || 100000
  const numbers = []

  for (let i = 0; i < parseCant; i++) {
    numbers.push(Math.floor(Math.random() * 1000))
  }
  process.send({ numbers })
})
