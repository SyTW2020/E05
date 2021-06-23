const { Router } = require('express');
const router = Router();

const User = require('../models/Users');

const jwt = require('jsonwebtoken');

//Usuarios////////////////////////////////////////////////////////////////
router.post('/sup', async (req, res) => {
    const {email, password, passwordconf} = req.body;
    if (password !== passwordconf) return res.status(401).send('Passwords dont match');
    const user = await User.findOne({email});
    if (!user){
        const newUser = User({email, password});
        await newUser.save();
        
        if(newUser) {
        const token = jwt.sign({_id: newUser._id}, 'secretKey');
        return res.status(200).json({token});
        }
    }
    else {
        return res.status(401).send('User already exists');
    }
});    

router.post('/sin', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) return res.status(200).send('Mail not known');
    if (user.password !== password) return res.status(401).send('Incorrect password');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    res.status(200).json({token});
});

//Cursos////////////////////////////////////////////////////////////////
//crear curso
router.post('/cursos', verifyToken, async (req, res) => {
    const {nombre} = req.body;
    const user = await User.findOne({_id:req.userId});
    var flag = false;
    user.cursos.forEach(element => {
        if (element.curso == nombre)
            flag = true;
    }); 
    if (!flag) {
        user.cursos.push({curso:nombre});
        await user.save().then((user) => {
            res.status(200).json({user: {cursos: user.cursos} });
        }); 
    }
    else
        res.status(401).send('Curso already exists');;
});
//lista de cursos
router.get('/cursos', verifyToken, async (req, res) => {
    const user = await User.findOne({_id:req.userId});
    res.status(200).json({user: {cursos: user.cursos} });
});
//borrar curso
router.delete('/cursos', verifyToken, async (req, res) => {
    const {nombre} = req.body;
    await User.updateOne({_id:req.userId}, {$pull: {cursos: {curso:nombre}}});
    const user = await User.findOne({_id:req.userId});
    res.status(200).json({user: {cursos: user.cursos} });
});


//Asignaturas////////////////////////////////////////////////////////////////
//crear asignatura en curso
router.post('/cursos/:name', verifyToken, async (req, res) => {
    const {nombre, codigo, practicas, teoria, grupos} = req.body;
    const curso = req.params.name;
    const user = await User.findOne({_id:req.userId}, {cursos:{$elemMatch: {curso:curso}}});
    var flag = false;
    user.cursos[0].asignaturas.forEach ((element) => {
        if (element.nombre == nombre)
            flag = true;
    })
    if (!flag){
        user.cursos[0].asignaturas.push({nombre, codigo, practicas, teoria, grupos})
        await user.save().then((user) => {
            res.status(200).json({user});
        }); 
    }
    else 
        res.status(401).send('Asignatura already exists');
});

//lista de asignaturas asignaturas en curso
router.get('/cursos/:name', verifyToken, async (req, res) => {
    const curso = req.params.name;
    const user = await User.findOne({_id:req.userId}, {cursos:{$elemMatch: {curso:curso}}});
    res.status(200).json({user});
});
//borrar asignatura en curso
router.delete('/cursos/:name', verifyToken, async (req, res) => {
    const curso = req.params.name;
    const {nombre} = req.body;
    const user = await User.findOne({_id:req.userId}, {cursos:{$elemMatch: {curso:curso}}});
    var cont = 0;
    var index = 0;
    user.cursos[0].asignaturas.forEach ((element) => {
        if (element.nombre == nombre)
            index = cont;
        cont += 1;
    })
    user.cursos[0].asignaturas.splice(index,1);
    await user.save().then((user) => {
        res.status(200).json({user});
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