const axios = require('axios');
const _ = require('lodash');


const fetchBlogData = async (req, res, next) => {
  try {
    const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs';
    const adminSecret = '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6';

    const response = await axios.get(apiUrl, {
      headers: {
        'x-hasura-admin-secret': adminSecret,
      },
    });

    const blogData = response.data;
    console.log(blogData)


    req.blogData = blogData;

    next();
  } catch (error) {
    console.error('Error fetching blog data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = fetchBlogData