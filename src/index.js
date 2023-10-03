const express = require('express');
const app = express();
const PORT = process.env.PORT || 3007;
const _ = require('lodash');

const { getBlogStatistics, searchBlogs } = require('./controller/blogcontroller');
const fetchBlogData = require('./middleware/blogmiddleware');

const cacheOptions = { maxAge: 60000 };
const cachedGetBlogStatistics = _.memoize(getBlogStatistics, JSON.stringify, cacheOptions);
const cachedSearchBlogs = _.memoize(searchBlogs, JSON.stringify, cacheOptions);

app.use((req, res, next) => {

  cachedGetBlogStatistics.cache.clear();
  cachedSearchBlogs.cache.clear();
  next();
});

app.use('/api/blog-stats',fetchBlogData)

app.get('/api/blog-stats', (req, res) => {
  cachedGetBlogStatistics(req, res);
});

app.get('/api/blog-search', (req, res) => {
  cachedSearchBlogs(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

