const withImages = require('next-images')
module.exports = withImages({env: {
    REACT_APP_URI: 'https://webjumpapignt.herokuapp.com/',
    REACT_APP_URL: process.env.REACT_APP_URL ?? 'http://localhost:3000/'
}});