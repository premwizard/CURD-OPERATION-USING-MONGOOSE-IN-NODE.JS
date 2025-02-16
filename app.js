const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db');
const BookModel = require('./models/bookModel');
dbo.getDatabase();

app.engine('hbs',exhbs.engine(
    {
        layoutsDir:'views/',
        defaultLayout:"main",
        extname:"hbs",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault:true
        }
    }))
app.set('view engine','hbs');
app.set('views','views')
app.use(bodyparser.urlencoded({extended:true}))

app.get('/', async (req,res)=>{
    let books = await BookModel.find({})

    let message = '';
    let edit_id, edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id; 
        edit_book = await BookModel.findOne({_id:edit_id})

    }
     
    if(req.query.delete_id){
       await BookModel.deleteOne({_id: req.query.delete_id})
       return res.redirect('/?status=3');
    }



    switch (req.query.status) {
        case '1':
            message = 'Inserted Successfully!'; 
            break;

        case '2':
            message = 'Updated Successfully';
            break;

            case '3':
                message = 'Deleteed Successfully';
                break;

        default:
            break;
    }


    res.render('main',{message,books,edit_id,edit_book})
})

app.post('/store_book', async (req,res)=>{
 
    const book = new BookModel({title: req.body.title, author:req.body.author})
    book.save();
    return res.redirect('/?status=1');
})


app.post('/update_book/:edit_id', async (req,res)=>{
    
    let edit_id = req.params.edit_id

    await BookModel.findOneAndUpdate({_id: edit_id},{title: req.body.title, author:req.body.author})
    return res.redirect('/?status=2');
})


app.listen(8000,()=>{console.log('Listening to 8000 port');})

