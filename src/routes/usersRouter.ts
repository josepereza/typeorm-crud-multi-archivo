import { Router } from 'express'
import { getConnection } from 'typeorm'
import { User } from '../entity/User'

const router = Router()

router.get('/', async (_, res, next) => {
  try {
    const userRepository = getConnection().getRepository(User)

    const users = await userRepository.find()

    res.status(200).json({ message: 'Fetched users', data: users })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const userRepository = getConnection().getRepository(User)

    const user = await userRepository.findOne(id)

    if (!user) throw new Error('User not found')

    res.status(200).json({ message: 'User fetched', data: user })
  } catch (err) {
    req.statusCode = err.message === 'User not found' ? 404 : undefined

    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userRepository = getConnection().getRepository(User)

    const newUser = userRepository.create(req.body)

    await userRepository.save(newUser)

    res.status(201).json({ message: 'User created', data: newUser })
  } catch (err) {
    req.statusCode = err.code === 'ER_DUP_ENTRY' ? 400 : undefined

    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { username } = req.body

  try {
    const userRepository = getConnection().getRepository(User)

    const user = await userRepository.findOne(id)

    if (!user) throw new Error('User not found')

    if (username) user.username = username

    await userRepository.save(user)

    res.status(200).json({ message: 'User modified', data: user })
  } catch (err) {
    req.statusCode = err.message === 'User not found' ? 404 : undefined

    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const userRepository = getConnection().getRepository(User)

    const user = await userRepository.findOne(id)

    if (!user) throw new Error('User not found')

    await userRepository.delete({ id: user.id })

    res.status(200).json({ message: 'User deleted', data: user })
  } catch (err) {
    req.statusCode = err.message === 'User not found' ? 404 : undefined

    next(err)
  }
})

export default router
