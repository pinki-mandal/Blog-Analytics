const _ = require('lodash');

const getBlogStatistics = (req, res) => {
  const blogData = req.blogData;


  const totalBlogs = _.size(blogData);
  const longestTitleBlog = _.maxBy(blogData.blogs, (blog) => _.get(blog, 'title', 0));
  const blogsWithPrivacyTitle = blogData.blogs.filter((blog) => blog.title.toLowerCase().includes('privacy'));
  const uniqueBlogTitles = _.uniqBy(blogData.blogs, 'title').map((blog) => blog.title);

  const statistics = {
    totalBlogs,
    longestTitle: longestTitleBlog.title,
    numberofblog: blogsWithPrivacyTitle.length, 
    uniqueBlog: uniqueBlogTitles,
  };

  res.json(statistics);
};

const searchBlogs = (req, res) => {
  const { query } = req.query;
  const blogData = req.blogData;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is missing.' });
  }

  const filteredBlogs = _.filter(blogData.blogs, (blog) =>_.includes(_.toLower(blog.title), _.toLower(query))
  );

  res.json(filteredBlogs);
};

module.exports = {
  getBlogStatistics,
  searchBlogs,
};