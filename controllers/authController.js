require('dotenv').config();
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const UserModel = require("../models/User");
const cookieParser = require('cookie-parser');



const generateToken = (id, roles) => {

	const payload = {
		 id,
		 roles
	}

	
	return jwt.sign(payload, process.env.SECRET, {expiresIn: '24h'})
}



class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400)
            }



            const {username, password} = req.body

            const candidate = await User.findOne({username})

            if(candidate) {
                return res.status(400).json({message: 'User with this username already exists'})
            }

            if(!username) {
                return res.status(400).json({message: 'username cannot be empty' })
            }

            const passwordLength = password.length

            if(!(passwordLength > 8 && passwordLength < 16)) {
                return res.status(400).json({message: 'password length must be between 8 and 16'})
            }



            const hashPassword = bcrypt.hashSync(password, 4);
            const userRole = await Role.findOne({value: "USER"});

            const user = new User({username, password: hashPassword, roles: userRole.value})
            await user.save();

            return res.json({message: 'user was successfully registered'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'registration error'})
        }
    }



    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})

            if(!user){
                return res.status(400).json({message: 'user with username ' + username + ' not found'})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) {
                return res.status(400).json({message: 'invalid password'})
            }



            const token = generateToken();



            // return res.json({token})
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.SECRET
                })
                .status(200)
                .json({message: 'logged in successfully'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'login error'})
        }
    }

    async logout(req, res) {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({message: 'Logged out'});
    }

    async edit(req, res) {
        if(!req.body) {
            res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `User not found.`
                });
            }else{
                res.send({ message: "User updated successfully." })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    }
}



module.exports = new authController();
