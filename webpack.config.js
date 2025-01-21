import path from "path";
import webpack from "webpack";
const __dirname = import.meta.dirname;

export default {
    mode: "development",
    entry: {
        client: ["webpack-hot-middleware/client?reload=true", "./src/client/index.ts"]       
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-typescript']
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [".ts", ".js"]
    }
}