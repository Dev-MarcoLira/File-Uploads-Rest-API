const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const Post = require('./models/Post')

routes.get('/posts', async ( req, res ) => {
    const posts = await Post.find({})

    return res.json(posts)
})

routes.post('/posts', multer(multerConfig).single('file'), async(req, res)=>{

    const { originalname: name, size, key, location: url = '' } = req.file

    try{

        const post = await Post.create({
            name,
            size,
            key,
            url,

        })

        return res.json(post)

    }catch(err) { console.log(err.message) }

})

routes.delete('/posts/:id', async ( req, res ) => {

    Post.deleteOne({ _id: req.params.id })
        .then(()=>{

            return res.send()
        })
        .catch(err=>{
            console.log(err.message)
        })
})

module.exports = routes