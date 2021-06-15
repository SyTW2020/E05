const { Router } = require('express');
const router = Router();

const User = require('../models/Users');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello, world'));

router.post('/sup', async (req, res) => {
    const {email, password, passwordconf} = req.body;
    if (password !== passwordconf) return res.status(401).send('Passwords dont match');
    const user = await User.findOne({email});
    if (!user){
        const newUser = User({email, password});
        await newUser.save();
        
        const token = jwt.sign({_id: newUser._id}, 'secretKey');
        res.status(200).json({token});
    }
    res.status(401).send('User already exists');
   
});

router.post('/sin', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) return res.status(401).send('Mail not known');
    if (user.password !== password) return res.status(401).send('Incorrect password');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    res.status(200).json({token});
});

//CURSOS
//meter curso
router.post('/cursos', verifyToken, async (req, res) => {
    const {nombre} = req.body;
    const user = await User.findOne({_id:req.userId});
    var flag = false;
    user.cursos.forEach(element => {
        if (element.curso == nombre) {
            res.status(401).send('Curso already exists');
            flag = true;
        }
    })
    if (!flag) {
        user.cursos.push({curso: nombre});
        await user.save();
        res.status(200).json({user});
    }
});
//lista de cursos
router.get('/cursos', verifyToken, async (req, res) => {
    const user = await User.findOne({_id:req.userId});
    res.status(200).json({user});
});


//ASIGNATURAS
//crear asignaturas
router.post('/cursos/:name', verifyToken, async (req, res) => {
    const {nombre, codigo, practicas, teoria, grupos} = req.body;
    const curso = req.params.name;
    const user = await User.findOne({_id:req.userId});
    var flag = false;
    user.cursos.forEach(element => {
        if(element.curso == curso) {
            element.asignaturas.forEach(as =>{
                if (as.nombre == nombre) {   
                    flag = true;
                    res.status(401).send('Asignatura already exists');
                }
            })
            if (!flag) 
                element.asignaturas.push({nombre, codigo, practicas, teoria, grupos}) 
        }
    })
    if (!flag) {
        await user.save();
        res.status(200).json({user});
    }
});

//recoger asignaturas
router.get('/cursos/:name', verifyToken, async (req, res) => {
    const user = await User.findOne({_id:req.userId});
    const curso = req.params.name;
    user.cursos.forEach(element => {
        if(element.curso == curso) {
            res.status(200).json({element});
        }
    });
});


module.exports = router;

//Bearer token...
function verifyToken (req, res, next) {
    if (!req.headers.auth) {
        return res.status(401).send('Not auth header')
    }

    const token = req.headers.auth.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Token not found')
    }

    const data = jwt.verify(token,'secretKey');
    req.userId = data._id;

    next();
}