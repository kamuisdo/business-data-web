const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            'primary-color': '#1da57a',
                            'border-radius-base':'4px'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};