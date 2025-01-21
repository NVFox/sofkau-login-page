import path from "path";
import express, { Express } from "express";

import webpack, { Configuration } from "webpack";
import webpackConfig from "../../webpack.config.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const __dirname = import.meta.dirname;

const css = path.join(__dirname, "../../", "public/css")
const html = path.join(__dirname, "views")

const app: Express = express();
const PORT = 9000;

const compiler = webpack(webpackConfig as Configuration);

app.set("views", express.static(html));
app.set("view engine", "ejs");

app.use(express.static(css))

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.get("/", (req, res) => {
    res.render("login");
})

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT)
})