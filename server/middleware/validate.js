import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const {error, value} = schema.validate(req.body, options)
    
    let message = ''
    
    if(error) {
       switch(error.details[0].path[0]) {
        case 'first_name':
          message = 'first name is required'
          break
        case 'last_name':
          message = 'last name is required'
          break
        case 'email':
          message = 'email is required'
          break
        case 'password':
          message = 'password is required'
          break
        case 'title':
          message = 'title is required'
           break
        default:
          message = 'fields has been filled incorrectly'
          break
        }
        return res.status(500).send(message)
    }

    req.body = value
    next()
}

export const postValidator = (req, res, next) => {

  const schema = Joi.object({

      title: Joi.string().min(5).max(255).required(),

      author: Joi.string().allow(''),

      ISBN_code: Joi.number().allow(''),

      image: Joi.string().allow(''),

      cover_author: Joi.string().allow('')

  })



  validate(schema, req, res, next)

}

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(12).required()
  })

  validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(12).required()
  })

  validate(schema, req, res, next)
}
 
export default validate