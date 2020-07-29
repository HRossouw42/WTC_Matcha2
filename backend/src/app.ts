import * as RegisterController from './controllers/registerController'
import * as ProfileController from './controllers/profileController'
import * as LoginController from './controllers/loginController'
import * as LogoutController from './controllers/logoutController'
import * as UserController from './controllers/userController'
import Router from 'koa-router'

const router = new Router()

router.post('/register', RegisterController.create)
router.get('/verify/:token', UserController.verify)
router.post('/forgot', UserController.forgot)
router.post('/reset', UserController.reset)

// Private routes
router.post('/login', LoginController.create)
router.post('/logout', LogoutController.create)
router.post('/profile', ProfileController.update)
router.post('/blocked', UserController.create)
router.post('/liked', UserController.liked)
router.post('/viewed', UserController.viewed)
router.get('/users', UserController.all)
router.get('/getById/:id', UserController.id)
router.post('/update-email', ProfileController.updateEmail)

export default router