let express = require("express")
let responseMiddle = require('./router/response')
let overviewRouter = require('./router/overview')
let onlineCountSingleRouter = require('./router/onlineCountSingle')
let onlineCountMultiRouter = require('./router/onlineCountMulti')
let areaRouter = require('./router/area')
let commonRouter = require('./router/common')
let energyRouter = require('./router/energy')
let runTimeRouter = require('./router/runTime')
let habitsRouter = require('./router/habits')
let airRouter = require('./router/air')
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 开启跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/', function(req, res) {
    res.send('this is my mock demo');
});


app.use('/mock/overview',overviewRouter)
app.use('/mock/onlineCountSingle',onlineCountSingleRouter)
app.use('/mock/onlineCountMulti',onlineCountMultiRouter)
app.use('/mock/area',areaRouter)
app.use('/mock/common',commonRouter)
app.use('/mock/energy',energyRouter)
app.use('/mock/runtime',runTimeRouter)
app.use('/mock/habits',habitsRouter)
app.use('/mock/air',airRouter)

app.use(responseMiddle)

app.listen(4000)
