import { Router } from 'express'
import * as controller from '../controllers/meta.controller.js'

const router = Router()

router.get('/categories', controller.categories)
router.get('/seasons', controller.seasons)
router.get('/stats', controller.stats)

export default router
