module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: 'less-loader',
                options: {
                    modifyVars: {
                        'primary-color': '#FAAD14',
                        'primary-color-hover': '#D48806',
                        'primary-color-active': '#FFD666',
                    },
                    javascriptEnabled: true,
                },
            },
        ],
    },
};
