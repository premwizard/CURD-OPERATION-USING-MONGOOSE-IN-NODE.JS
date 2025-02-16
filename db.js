const mongoose = require('mongoose')

let database;

async function getDatabase(){
   
    mongoose.connect('mongodb://127.0.0.1:27017/libary')
    .then(() =>{
        console.log('Database Connected!')
    }).catch(()=>{
        console.log('Database Connection Error')
    })
}

module.exports = {
    getDatabase,

}

