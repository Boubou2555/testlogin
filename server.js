const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const readUsers = () => {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    let users = readUsers();

    if (users.find(user => user.email === email)) {
        res.status(400).send({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    } else {
        users.push({ name, email, password });
        writeUsers(users);
        res.status(200).send({ message: 'تم التسجيل بنجاح' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.status(200).send({ message: 'تم تسجيل الدخول بنجاح', name: user.name });
    } else {
        res.status(400).send({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
