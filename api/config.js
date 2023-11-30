export const IS_DEV = process.env.NODE_ENV === 'dev'
export const IS_PROD = process.env.NODE_ENV === 'prod'
export const IS_TEST = process.env.NODE_ENV === 'test'

export const PORT = process.env.PORT || 3000

export const WHITELISTED_DOMAINS = IS_DEV
  ? process.env.D_WHITELISTED_DOMAINS.split(',')
  : process.env.P_WHITELISTED_DOMAINS.split(',')

// export const FRONTEND_URL = IS_DEV
//   ? process.env.D_FRONTEND_URL.split(',')
//   : process.env.P_FRONTEND_URL.split(',')

// export const EMAIL_CONFIG = {
//   HOST: process.env.EMAIL_HOST,
//   USER: process.env.EMAIL_USER,
//   PASS: process.env.EMAIL_PASS,
//   TO: process.env.EMAIL_TO
// }

export const MONGO_URI = IS_TEST
  ? process.env.T_MONGO_URI
  : process.env.P_MONGO_URI

export const { JWT_SECRET } = process.env
