const router = require('express').Router()
const { fetchDocuments, UploadDocuments } = require('../routes/docfile')

router.get('/', fetchDocuments)
router.post('/', UploadDocuments)

module.exports = router