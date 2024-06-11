const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', (req, res, next) => {
  Blog.findAll()
    .then(blogs => {
      res.json(blogs);
    })
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
  Blog.create(req.body)
    .then(blog => {
      res.json(blog);
    })
    .catch(error => next(error));
});

router.put('/:id', blogFinder, (req, res, next) => {
  if (req.blog) {
    const updatedBlog = { ...req.blog.toJSON() };
    updatedBlog.likes = parseInt(req.blog.likes) + 1;

    req.blog.update(updatedBlog)
      .then(() => {
        res.json({ likes: req.blog.likes });
      })
      .catch(error => next(error));
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, (req, res, next) => {
  if (req.blog) {
    req.blog.destroy()
      .then(() => {
        res.json({ message: "Deleted blog" });
      })
      .catch(error => next(error));
  } else {
    res.status(404).end();
  }
});

module.exports = router;