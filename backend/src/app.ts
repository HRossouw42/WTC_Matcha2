import * as RegisterController from './controllers/registerController'
import * as ProfileController from './controllers/profileController'
import * as LoginController from './controllers/loginController'
// import * as LogoutController from './controllers/logoutController'
// import * as UserController from './controllers/userController'
import Router from 'koa-router'

const router = new Router()

router.post('/signup', RegisterController.create)
router.put('/profile', ProfileController.update)
router.post('/login', LoginController.create)
router.post('/logout')
router.get('/user')

export default router