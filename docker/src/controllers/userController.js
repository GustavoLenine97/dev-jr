import User from '../models/User.js'
import crypto from 'node:crypto'

export const createUser = async (req, res) => {
 
    const userToCreate = {
        id: crypto.randomUUID(),
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }
    
    const user = await User.create(userToCreate)

    res.status(201).json(user)

    
}

export const getAllUsers = async (req, res) => {

    const users = await User.findAll()

    res.status(200).json(users)
}

export const deleteUsers = async (req, res) => {
    const user = await User.destroy({
        where: {id: req.params.id}
    })
    res.status(200).json(user)
}


/*
export const createUser = async (req, res) => {

    try {

        const userToCreate = {
            id: crypto.randomUUID(),
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }

        const user = await User.create(userToCreate)

        return res.status(201).json(user)

    } catch (err) {

        console.log(err.parent?.message)
        console.log(err.message)

        return res.status(500).json({
            error: err.message
        })
    }
}

*/