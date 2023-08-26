module.exports = {
    images: {
        domains: ['localhost:3000', 'cdn.pixabay.com', 'i.ibb.co']
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true
                    }
                }
            ]
        });
        return config;
    },
    output: 'export'
};
