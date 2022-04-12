const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = [
    {
        mode: 'production',
        devtool: 'cheap-module-source-map',
        entry: './src/index.tsx',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1, modules: true }
                        }
                    ]
                }
            ]
        }
    },
    {
        mode: 'production',
        target: 'node',
        entry: './src/server/index.ts',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                }
            ]
        },
        externals: [nodeExternals()]
    }
];
