const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()

})

//book validation here
const bookSchema = Joi.object({

})

module.exports = {
  registerSchema,
  loginSchema,
  bookSchema
}