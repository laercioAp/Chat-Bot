import express, { request, response } from "express";
import "./database";
import { routes } from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
})

const http = createServer(app); //criando protocolo http
const io = new Server(http); //criando protocolo de web socket

io.on("connection", (socket: Socket) => {
    // console.log("Se conectou no ws", socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io }