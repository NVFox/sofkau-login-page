import path from "path";
const __dirname = import.meta.dirname;

export default {
    entry: {
        client: "./src/client/index.ts"       
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
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
    resolve: {
        extensions: [".ts", ".js"]
    }
}