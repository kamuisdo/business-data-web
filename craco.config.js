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
                        modifyVars: {
                            'primary-color': '#2B6AFF'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};