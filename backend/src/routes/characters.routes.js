import { Router } from 'express'
import * as controller from '../controllers/characters.controller.js'

const router = Router()

router.get('/', controller.list)
router.get('/:slug', controller.getBySlug)

export default router
