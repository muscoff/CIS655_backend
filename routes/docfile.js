const path = require('path')
const formidable = require('formidable')
const {Storage} = require('@google-cloud/storage')
const db = require('../config/db')

// working with google storage
const bucketName = 'my-bucket-assignment'
const projectId = 'stunning-prism-447018-c5'
const dir_name = path.parse(__dirname).dir
const keyFilename = path.join(dir_name, 'config', 'apikey.json')
const storage = new Storage({projectId, keyFilename})
const bucket = storage.bucket(bucketName)

const public_url = 'https://storage.cloud.google.com/'

const fetchDocuments = (req, res)=> {
    const {doc_user} = req.query
    const sql = "SELECT * FROM docman_table where doc_user = ?"
    db.query(sql, [doc_user], (err, result)=>{
        if(err){
            console.log('error occurred', err.message)
            return res.status(400).json({status: false, message: err.message})
        }

        res.status(200).json({status: true, data: result})
    })
}

const UploadDocuments = async(req, res) => {
    const form = new formidable.IncomingForm({multiples: false})

    form.parse(req, (err, fields, files) => {
        if(err){
            console.error(err)
            return res.status(500).json({status: false, message: 'Error processing form'})
        }

        const destination = Math.floor(Math.random() * 100000000)
        const dest_filename = `${destination}${files.docfile[0].originalFilename}`
        const options = {destination: dest_filename}

        const { name, username } = fields
        const doc_name = name[0]
        const doc_user = username[0]

        bucket.upload(files.docfile[0].filepath, options)
        .then(uploadResponse=>{
            const doc_location = `${public_url}${bucketName}/${dest_filename}`
            const postData = {doc_name, doc_user, doc_location}
            const sql = "INSERT INTO docman_table SET ?"

            db.query(sql, postData, (err, result)=>{
                if(err) {
                    console.log('post-error',err)
                    return res.status(400).json({status: false, message: err.message})
                }

                console.log('post-results',result)
                return res.status(200).json({status: true, data: result})
            })
        })
        .catch(err=>{
            console.error(err)
            res.status(400).json({message: err.message})
        })
    })
}

module.exports = {
    fetchDocuments,
    UploadDocuments
}