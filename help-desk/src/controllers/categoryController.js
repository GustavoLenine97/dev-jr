import * as categoryService from '../services/categoryService.js'

export async function createCategory(req, res, next) {
    try {
        const category = await categoryService.create(req.body)

        return res.status(201).json(category)
    } catch (error) {
        next(error)
    }
}

export async function listCategory(req, res, next) {
    try {
        const categories = await categoryService.list()

        return res.json(categories)
    } catch (error) {
        next(error)
    }
}

export async function updateCategory(req, res, next) {
    try {
        const category = await categoryService.update(req.params.id, req.body)

        return res.json(category)
    } catch (error) {
        next(error)
    }  
}

export async function deleteCategory(req, res, next) {
    try {
        await categoryService.remove(req.params.id)

        return res.status(200).json({
            message: 'Categoria removida com sucesso!'
        }) 
    } catch (error) {
       next(error)
    }
}