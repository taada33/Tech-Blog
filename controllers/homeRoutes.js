const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log(req.session.logged_in);
    const postData = await Post.findAll({
      include: [{ 
        model: User,
        attributes: { exclude: ['password']},
      },{ model: Comment}],
      order: [['updated_at', 'ASC']],
    });

    const userData = await User.findAll({ attributes: { exclude: ['password']}})
    const users = userData.map((user) => user.get({ plain: true}));

    const posts = postData.map((post) => post.get({ plain: true }));

    //maps user names from users array to their individual comments on posts

    posts.forEach(post => {
      post.comments.forEach(comment => {
        comment.name = users[comment.user_id - 1].name
      })
    });

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/dashboard', async (req,res) => {
  if(!req.session.logged_in){
    res.redirect('/login')
    return;
  }

  const userData = await User.findByPk(req.session.user_id, {
    // include: [{ model: Post}, { model: Comment}]
  })

  console.log(userData)

  res.render('dashboard',{
    logged_in: req.session.logged_in,
  })
})

module.exports = router;
