const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(con=>{
    console.log("connected DB")
}).catch(err=>{
    console.log('error',err)
})

module.exports = mongoose;