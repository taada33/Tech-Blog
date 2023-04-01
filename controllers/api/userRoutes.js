const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//creating new user
router.post('/register', async (req,res) => {
  try {

    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
    })

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser)
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

//logging in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    console.log(userData)
    // if (!userData) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect username or password, please try again' });
    //   return;
    // }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//logging out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).json({ message: 'You are now logged out!'}).end();
    });
  } else {
    res.status(404).end();
  }
});

//get users posts
router.get('/:id', async (req,res) => {
  try {
    const userData = await User.findbyPk(req.params.id, 
      {
      include: { model: Post},
      // attributes: { exclude: ['password']},
    })

    if(!categoryData){
      res.status(404).json({ message: 'no category found with that id!'})
      return;
    }
    res.status(200).json(userData);
    // const posts = userData.map((user) => post.get({ plain: true }));

    // res.status(200).json(posts);
    // res.render('dashboard', {
    //   posts,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(400).json(err);
  }
})


//get a post's comments

//creating new post
router.post('/post', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
})

//update post

//delete post

//creating new comment
router.post('/comment', async (req,res) => {
  try {
    console.log(req.body);
    const commentData = await Comment.create({
      content: req.body.content,
      user_id: +req.session.user_id || req.body.user_id,
      post_id: +req.body.post_id,
    })
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update comment

//delete comment




module.exports = router;