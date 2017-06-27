const express = require('express');
const router = express.Router();
const axios = require('axios');
const API = 'http://jsonplaceholder.typicode.com';
//Get api listing
router.get('/', (req, res) =>{
    res.send('api works');
});

// router.get('/posts', (req, res) =>{
//     axios.get(`${API}/posts`).then(
//         posts => {
            
//             console.log("Getting data");
//             res.status(200).json(posts.data);
//         }
//     ).catch(error => {
//         res.status(500).send(error);
//     });
// });


module.exports = router;