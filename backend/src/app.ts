import * as UsersController from './controllers/userController'
import * as UserProfile from './controllers/profileController'
import Router from 'koa-router'

const router = new Router()

router.post('/users', UsersController.create)
router.put('/profile', UserProfile.update)

export default router