let express = require("express")
let Mock = require('mockjs')
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let router = express.Router();

app.get('/', function(req, res) {
    res.send('this is my mock demo');
});

app.post('/user',function (req,res){
    //调用mock方法模拟数据
    let data = Mock.mock({
            'list|1-10': [
                {
                    'qq_number|+1':"1302507089",
                    'operator_name': "test",
                    'wechat_number': "zixue0505",
                    'year|+1': 2019
                }
            ],
            config:{
                page: 1,
                page_size: 10,
                total_num: 4,
                total_page: 1
            }
        }
    );
    return res.json(data);
})

app.listen(4000)
