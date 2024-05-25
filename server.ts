import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import connectDb from "./src/config/db";
import { requireAuth } from "./src/middlewares/auth_token";
import auth_routes from "./src/routes/auth_routes";
import hotelRoutes from "./src/routes/hotel_routes";
import roomRoutes from "./src/routes/room_routes";
import user_routes from "./src/routes/user_routes";

dotenv.config();

const { PORT }: any = process.env;

const server: Express = express();

server.use(express.json());
server.use(cookieParser());
server.set("view engine", "ejs");
server.use("/assets", express.static("public"));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on ${PORT}`);
});

// SIGN IN & SIGN UP
server.use("/user/v1", auth_routes);

// HOTEL ROUTES
server.use("/hotel", requireAuth, hotelRoutes);

// ROOM ROUTES
server.use("/room", requireAuth, roomRoutes);

// USER ROUTES
server.use("/user", requireAuth, user_routes);

// HOME
server.get("/", (req, res) => {
  res.render("home");
});

// ABOUT
server.get("/about", (req, res) => {
  res.render("about");
});
