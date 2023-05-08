const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 5678;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

const hbs = exphbs.create({});

app.engine("handlebars",hbs.engine);
app.set("view engine","handlebars");

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use(routes);

sequelize.sync({force:true}).then(()=>{
    app.listen(PORT, ()=> console.log(`Listening on port ${PORT}.`));
});