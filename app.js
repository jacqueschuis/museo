if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/expresserror");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");
const MongoDBStore = require("connect-mongo");
const catchAsync = require("./utilities/catchasync");

const User = require("./models/user");

const artworkRoutes = require("./routes/artworkRoutes");
const museumRoutes = require("./routes/museumRoutes");
const artistRoutes = require("./routes/artistRoutes");
const userRoutes = require("./routes/userRoutes");
const devRoutes = require("./routes/devRoutes");
const searchRoutes = require("./routes/searchRoutes");
const Artist = require("./models/artist");
const Museum = require("./models/museum");
const Artwork = require("./models/artwork");

const dbUrl = "mongodb://localhost:27017/muzeion";
const atlasUrl = process.env.ATLAS_URL;

mongoose.set("strictQuery", true);
mongoose.connect(atlasUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

const store = MongoDBStore.create({
  mongoUrl: atlasUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: "secret",
  },
});

store.on("error", function (e) {
  console.log("session store error", e);
});

const sessionConfig = {
  store,
  name: "sesh",
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    HttpOnly: true,
    // secure: true,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/admin", devRoutes);
app.use("/museums", museumRoutes);
app.use("/artists", artistRoutes);
app.use("/artworks", artworkRoutes);
app.use("/search", searchRoutes);

app.get("/", (req, res) => {
  res.render("app/home");
});

app.get("/about", (req, res) => {
  res.render("app/about");
});

app.get(
  "/random",
  catchAsync(async (req, res) => {
    const randomCategory = Math.floor(Math.random() * 3);
    if (randomCategory === 0) {
      const museums = await Museum.find({});
      const randomMuseum = Math.floor(Math.random() * museums.length);
      const museum = museums[randomMuseum];
      return res.redirect(`/museums/${museum._id}`);
    } else if (randomCategory === 1) {
      const artists = await Artist.find({});
      const randomArtist = Math.floor(Math.random() * artists.length);
      const artist = artists[randomArtist];
      return res.redirect(`/artists/${artist._id}`);
    }
    const artworks = await Artwork.find({});
    const randomArtwork = Math.floor(Math.random() * artworks.length);
    const artwork = artworks[randomArtwork];
    return res.redirect(`/artworks/${artwork._id}`);
  })
);

app.all("*", (req, res, next) => {
  return next(new ExpressError("page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(status).render("app/error", { err });
});

app.listen(3001, () => {
  console.log("listening on port 3500");
});
