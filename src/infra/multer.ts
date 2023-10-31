import multer from 'multer'
import path from 'path'
import crypto from 'node:crypto'

export const upload = multer({
  dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
  limits: { fileSize: 1024 * 1024 * 2 },
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
    },
    filename(_req, file, callback) {
      const fileName = `${crypto.randomBytes(20).toString('hex')}${
        file.originalname
      }`
      callback(null, fileName)
    },
  }),
})
