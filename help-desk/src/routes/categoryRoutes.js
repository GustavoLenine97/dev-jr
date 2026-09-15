import { Router } from 'express'
import { createCategory, deleteCategory, listCategory, updateCategory } from '../controllers/categoryController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/authorizeMiddleware.js'

const routerCategory = Router()

routerCategory.get('/', authMiddleware, authorize("admin"), listCategory)
routerCategory.post('/', authMiddleware, authorize("admin"),createCategory)
routerCategory.put('/:id', authMiddleware, authorize("admin"), updateCategory)
routerCategory.delete('/:id', authMiddleware, authorize("admin"),deleteCategory)

export default routerCategory