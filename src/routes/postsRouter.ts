import { Router } from 'express'
import { getConnection } from 'typeorm'
import { Post } from '../entity/Post'

const router = Router()

router.get('/', async (_, res, next) => {
  try {
    const postRepository = getConnection().getRepository(Post)

    const posts = await postRepository.find()

    res.status(200).json({ message: 'Posts fetched', data: posts })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const postRepository = getConnection().getRepository(Post)

    const newPost = postRepository.create(req.body)

    await postRepository.save(newPost)

    res.status(201).json({ message: 'Posts fetched', data: newPost })
  } catch (err) {
    req.statusCode = err.code === 'ER_DUP_ENTRY' ? 400 : undefined

    next(err)
  }
})

export default router
