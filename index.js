const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const db = {
    users: [
        {
            username: 'zzz',
            password: '123'
        }
    ]
}
app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/v1', (req, res) => {
    res.json({
        "message" : "hello!"
    })
})

app.post('/login', (req, res) => {
    let { username, password } = req.body;
    const user = db.users.find(el => {return (el.username === username)});
    let result = (user.password === password ? 'success' : 'fail');
    res.setCookie('id', user.username);
    res.json({message: result, username: user.username});
})

const server = app.listen(3000, () => {console.log('Setting sail from 3000!!!')});
