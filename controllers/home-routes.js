const router = require('express').Router();
const { json } = require('sequelize/types');
const apiAuth = require("../middleware/apiAuth")
const { User, BlogPost, Comment } = require('../models/');

// loads the home page
router.get('/', async (req, res) => {
    res.render('index')
})

// if user is logged in, displays user dashboard; otherwise, sends user to login page
router.get('/dashboard', apiAuth, async (req, res) => {
    try {
        const userPostData = await BlogPost.findAll({
            where: {
                user_id: req.session.user.id
            }
        })
        if (!req.session.user) {
            res.render('login')
            return;
        }
        const userPosts = userPostData.map((posts) => posts.get({ plain: true }))
        console.log(userPosts.general_name);

        res.render("dashboard", { userPosts })
    } catch (err) {
        res.json(err);
    }
});

// open a specific post with comments from the user's dashboard
router.get('dashboard/:id', apiAuth, async (req, res) => {
    const userPostData = await BlogPost.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    const PostCommentsData = await Comment.findByPk(req.params.id, {
        include: [{ model: BlogPost }]
    })
    const userPost = userPostData.get({ plain: true })
    const postComments = postCommentsData.map((comments) => comments.get({ plain: true }))
    res.render("dashboard", { userPost, postComments })
})

// open a specific post with comments from the index page
router.get('post/:id', apiAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findOne({
            where: {
                blogpost_id: req.session.user_id
            }
        })
        if(!req.session.user) {
            res.render('index')
            return
        }
        const PostCommentsData = await Comment.findByPk(req.params.id, {
            include: [{ model: BlogPost }]
        })
        const blogPost = blogPostData.get({ plain: true })
        const postComments = postCommentsData.map((comments) => comments.get({ plain: true }))
        res.render("index", { blogPost, postComments })
    } catch (err) {
        res.json(err)
    }
})