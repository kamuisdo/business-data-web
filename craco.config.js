const CracoLessPlugin = require('craco-less');

module.exports = {
    babel:{

    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // 修改主题颜色
                        // modifyVars: {
                        //     'primary-color': '#1da57a',
                        //     'border-radius-base':'4px'
                        // },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};