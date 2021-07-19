const withImages = require('next-images')
module.exports = withImages({env: {
    REACT_APP_URI: 'https://webjumpapignt.herokuapp.com/',
}});