import express from 'express'
import cors from 'cors'
import session from 'express-session'
import posts from './controller/posts.js' 
import users from './controller/users.js' 

const app = express()


app.use(cors())


app.use(express.json())

app.use('/uploads', express.static('uploads'))


app.use(express.urlencoded({extended: true}))

app.set('trust proxy', 1) 

app.use(session({
    secret: 'Labai slapta fraze',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 60000000
    }
    
 }))


app.use('/api/post/',posts)


app.use('/api/users/', users)

app.listen(3000)