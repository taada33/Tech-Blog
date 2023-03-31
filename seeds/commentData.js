const { Comment } = require('../models')

const commentData = [
    {
        content: "Hello this is a test comment.",
        post_id: 1,
        user_id: 1,
    },
    {
        content: "Hello this is another test comment.",
        post_id: 1,
        user_id: 2,
    },
    {
        content: "Hello this is third test comment.",
        post_id: 2,
        user_id: 1,
    },
    {
        content: "Hello world.",
        post_id: 3,
        user_id: 3,
    },
    {
        content: "Hello this comment is attached to the third post.",
        post_id: 3,
        user_id: 2,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;