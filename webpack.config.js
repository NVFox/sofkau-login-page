import path from "path";
const __dirname = import.meta.dirname;

export default {
    entry: {
        client: "./src/client/index.js"       
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}