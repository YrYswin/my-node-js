const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routs');
const postApiRoutes = require('./routes/api-post-routes')
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs')



mongoose
   .connect(process.env.MONGO_URL)
   .then((res) => console.log('Connected to DB'))
   .catch((error) => console.log(error))

app.listen(process.env.PORT, (error) => {
   error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
   const title = 'Home';
   res.render(createPath('index'), { title });
})

app.use(postApiRoutes);

app.use(contactRoutes);

app.use(postRoutes);


app.use((req, res) => {
   const title = 'Error Page';
   res
      .status(404)
      .render(createPath('error'), { title });
})