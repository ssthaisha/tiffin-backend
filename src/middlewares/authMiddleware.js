import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/users.js'
import Vendor from '../models/vendors.js'

const protect = async (req, res, next) => {
  let token

  console.log(req.headers.authorization, 'authS')
  if(req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')) {
      console.log('token found')
      try{
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded, 'decoded')
        req.user = await User.findById(decoded.id).select('-password')
        next()
      } catch (error) {
        res.status(401)
        throw new Error('Not authorized!')
        next()
      }
    }
    
    if(!token) {
      res.status(401)
        throw new Error('Not authorized!')
         next()
    }

}

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin!')
  }
}

const vendor  = async (req, res, next) => {
  let token

  console.log(req.header.authorization)
  if(req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')) {
      // console.log('token found')
      try{
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded, 'decoded /n', token)
        req.vendor = await Vendor.findById(decoded.id).select('-password')
        next()
      } catch (error) {
        res.status(401)
        throw new Error('Not authorized!')
        next()
      }
    }
    
    if(!token) {
      res.status(401)
        throw new Error('Token Not authorized!')
         next()
    }

}

export { protect, admin, vendor }