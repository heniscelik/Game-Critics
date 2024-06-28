const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB bağlantısı
const mongoURI = 'mongodb+srv://<huseyineniscelik>:<wKoDqH4AFoFn6SxP>@cluster0.mongodb.net/profiler?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Kullanıcı Schema ve Model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Yorum Schema ve Model
const CommentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    comment: { type: String, required: true }
});
const Comment = mongoose.model('Comment', CommentSchema);

// API Endpoint'leri
app.post('/api/profile', async (req, res) => {
    const { name } = req.body;
    try {
        let user = await User.findOne({ name });
        if (!user) {
            user = new User({ name });
            await user.save();
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

app.post('/api/comment', async (req, res) => {
    const { userName, comment } = req.body;
    try {
        const newComment = new Comment({ userName, comment });
        await newComment.save();
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
