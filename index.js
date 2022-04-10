const express = require('express'); 
const app = express();
const port = process.env.PORT || 8000;
// const db = new sqlite3(path.resolve('messages.db'), {fileMustExist: true});
const db = require("./db/messages");
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        message: 'OK'
    })
})

const key = '1236hjgfg79r67uDThw46nwq34vbt35ybn4w65w4vytw48uw';
// {
//     "key": "1236hjgfg79r67uDThw46nwq34vbt35ybn4w65w4vytw48uw"
// }

app.get('/message', async (req, res) => {
    console.log(req.body.key)
    if (!req.body.key) {
        res.status(404).send({ message: 'No key found' });
        return;
    }
    if (req.body.key == key){
        messages = await db.getAllMessages();
        res.status(200).send({ messages });
    } else {
        res.status(404).send({ message: 'invalid key' });
    }
})

// {
//     "email": "test@test.gmail.com",
//     "name": "test name",
//     "message": "test msg"
// }

app.post('/message', async (req, res) =>{
    const  email  = req.body.email;
    const name = req.body.name;
    const msg = req.body.message;
    
    if(!email) {
        res.status(418).send({ message: 'We need an Email!'})
        return;
    }
    if(!name) {
        res.status(418).send({ message: 'We need a Name!'})
        return;
    }
    if(!msg) {
        res.status(418).send({ message: 'We need a Message!'})
        return;
    }

    // db.run(`CREATE TABLE IF NOT EXISTS Message (id INTEGER PRIMARY KEY AUTOINCREMENT, email text NOT NULL, name text NOT NULL, message text NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`);
    // const result = db.run('INSERT INTO Message (email, name, message) VALUES (@email, @name, @message)', {email, name, msg});
    const results = await db.createMessage(req.body)

    res.status(201).send({
        id: results[0]
    })
})

app.listen(
    port, () => console.log('Server started')
)