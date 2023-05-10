import { Router } from 'express'
import checkAuth from '../middleWare/authMiddleware.js'

const accRouter = Router()

accRouter.get('/', checkAuth, async (req, res, next) => {
  return res.json(req.user)
})

export default accRouter
