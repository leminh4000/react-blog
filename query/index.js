const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts)
})

const posts = {}

function handleEvent(type, data) {
    if (type === 'PostCreated') {
        const {
            id,
            title
        } = data;
        posts[id] = {
            id,
            title,
            comments: []
        }
    }
    if (type === 'CommentCreated') {
        const {
            id,
            content,
            postId,
            status,
        } = data

        const post = posts[postId]
        post.comments.push({
            id,
            content,
            status,
        })
    }
    if (type === 'CommentUpdated') {
        const {
            id,
            content,
            postId,
            status,
        } = data

        const post = posts[postId]
        const comment = post.comments.find(c => c.id === id)

        comment.status = status
        comment.content = content

    }
}

app.post('/events', (req, res) => {
    let {
        data,
        type
    } = req.body

    handleEvent(type, data);


    Object.values(posts).map(post =>{console.log('comments', post.comments)})
})

app.listen(4002, async () => {
    console.log('listening on 4002')

    const res = await axios.get('http://localhost:4005/events')
    for (let event of res.data){
        console.log('Processing event: ' + event.type)

        handleEvent(event.type, event.data)
    }

})
