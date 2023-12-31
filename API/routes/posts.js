const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { authenticate } = require("../jwt");

//CREATE POST
router.post("/", authenticate, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", authenticate, async (req, res) => {
  console.log("route", req);
  try {
    const post = await Post.findById(req.params.id);
    console.log("===========  postupdate username", req.body);

    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", authenticate, async (req, res) => {
  try {
    let postData = await Post.findById(req.params.id);
    console.log("===========  postdetele username", postData);
    // console.log("========= req.body.username",  req.body)
    // console.log("========= req.body.params",  req.params)
    if (postData.username == req.body.username) {
      try {
        // const deletedData = await postData.delete();
        const response = await Post.findByIdAndDelete(req.params.id);
        console.log("Removed post:", response);
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        console.log("error =================== eror ", err);

        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    console.log("error =================== eror ", error);
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page (default to 1)
  const limit = parseInt(req.query.limit) || 10; // Number of items per page (default to 10)
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let query = {}; 
   
    if (username) {
      query.username = username;
    } else if (catName) {
      query.categories = {
        $in: [catName],
      };
    }

    const totalPosts = await Post.countDocuments(query);
    const skip = (page - 1) * limit;

    const posts = await Post.find(query).skip(skip).limit(limit);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({ posts, totalPages });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
