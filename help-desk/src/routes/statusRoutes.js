import { Router } from 'express'
import { createStatus, deleteStatus, listStatus, updateStatus } from '../controllers/statusController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/authorizeMiddleware.js'

const routerStatus = Router()

routerStatus.get('/',authMiddleware, authorize("admin"), listStatus)
routerStatus.post('/',authMiddleware, authorize("admin"), createStatus)
routerStatus.put('/:id',authMiddleware, authorize("admin"), updateStatus)
routerStatus.delete('/:id', authMiddleware, authorize("admin"), deleteStatus)

export default routerStatus