import * as RegisterController from './controllers/registerController'
import * as ProfileController from './controllers/profileController'
import * as LoginController from './controllers/loginController'
// import * as LogoutController from './controllers/logoutController'
import * as UserController from './controllers/userController'
import Router from 'koa-router'

const router = new Router()

router.post('/register', RegisterController.create)
router.post('/profile', ProfileController.update)
router.post('/login', LoginController.create)
router.delete('/blocked', UserController.create)
router.get('/verify/:token', UserController.verify)
router.post('/forgot', UserController.forgot)
router.post('/reset', UserController.reset)
router.post('/logout')
router.get('/user')

export default router