import path from "path";
import webpack from "webpack";
import Dotenv from "dotenv-webpack"
const __dirname = import.meta.dirname;

export default {
    mode: "development",
    entry: {
        client: ["webpack-hot-middleware/client?reload=true", "./src/client/index.ts"],
        signup: ["webpack-hot-middleware/client?reload=true", "./src/client/signup.ts"],
        profile: ["webpack-hot-middleware/client?reload=true", "./src/client/profile.ts"],
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
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
    ],
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src/client/"),
            "#": path.resolve(__dirname, "src/shared/")
        }
    }
}