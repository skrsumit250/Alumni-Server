import Router from 'express'
import { addUserData,findUser } from '../api/addUserData.js'

const router = Router()

router.route('/addUserData').post(addUserData)
router.route('/findUser').post(findUser)

export default router