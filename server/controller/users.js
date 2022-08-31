import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'
import { registerValidator, loginValidator } from '../middleware/validate.js'

const router = express.Router()

router.post('/register', registerValidator, async (req, res) => {
    try {
  const userExist = await db.Users.findOne({
         where: {
            email: req.body.email
  }} 
) 
        
        if (userExist) {
            res.status(401).send('user already exists')
            return
        }

    req.body.password = await bcrypt.hash(req.body.password, 10)
    

        await db.Users.create(req.body)
        res.send('user created successfully')
    } catch {
        res.status(400).send('server error')
    }
})

router.post('/login', loginValidator, async (req, res) => {
    try {
      const user = await db.Users.findOne({ 
        where: 
        { email: req.body.email
     }})

    if (!user) 
        return res.status(401).send('user not found')

  if(await bcrypt.compare(req.body.password, user.password)) {
    req.session.loggedin = true
    res.send('logged in successfully')
  } else {
    res.status(401).send('password incorrect')
  }
} catch(error){
    console.log(error)
    res.status(418).send('server error')
}
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('logged out successfully')
})

export default router