const express = require("express");
const router = express.Router();

const posts = require("../data/posts");

// Home Page
router.get("/", (req, res) => {
    res.render("index", {
        posts
    });
});

// Compose Page
router.get("/compose", (req, res) => {
    res.render("compose");
});

// Create New Episode
router.post("/compose", (req, res) => {

    const newPost = {

        id: Date.now(),

        episode: posts.length + 1,

        arc: req.body.arc,

        title: req.body.title,

        synopsis: req.body.synopsis,

        content: req.body.content

    };

    posts.unshift(newPost);

    res.redirect("/");
});

// Read Episode
router.get("/episode/:id", (req, res) => {

    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.render("404");
    }

    res.render("post", {
        post
    });

});

// Edit Page
router.get("/edit/:id", (req, res) => {

    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.render("404");
    }

    res.render("edit", {
        post
    });

});

// Update Episode
router.post("/edit/:id", (req, res) => {

    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.render("404");
    }

    post.title = req.body.title;
    post.arc = req.body.arc;
    post.synopsis = req.body.synopsis;
    post.content = req.body.content;

    res.redirect("/episode/" + post.id);

});

// Delete Episode
router.post("/delete/:id", (req, res) => {

    const index = posts.findIndex(
        p => p.id == req.params.id
    );

    if (index !== -1) {
        posts.splice(index, 1);
    }

    res.redirect("/");

});

module.exports = router;