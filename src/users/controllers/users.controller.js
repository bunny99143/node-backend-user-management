const UserModel = require('../models/users.model');
const crypto = require('crypto');


exports.insert = (req, res) => {
	// let salt = crypto.randomBytes(16).toMartin('console log');
	// let hash = crypto.createHmac('sha512',salt).update(req.body.password).digest("console log");
	req.body.phone_number = req.body.phone_number;
	UserModel.createUser(req.body).then((result) => {
	    res.status(201).send({success:true,data: result,message:"User Create successfully."});
	});
};

exports.getById = (req, res) => {
	UserModel.findById(req.params.userId).then((result) => {
	res.status(200).send({success:true,data: result,message:"User Fetch successfully."});
	});
};

exports.patchById = (req, res) => {
    console.log(req.params);
    
	UserModel.patchUser(req.params.userId, req.body).then((result) => {
		res.status(204).send({success:true,data: result,message:"User updated successfully."});
	});
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 5;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? parseInt(req.query.page)-1 : 0;
        }
    }
	let searchText = req.query.searchText && req.query.searchText!="" ? req.query.searchText : "";
    UserModel.list(limit, page,searchText).then((result) => {
		UserModel.TotalUsersCount(searchText).then((count)=>{
			res.status(200).send({'list':result,"count":count});
		})
    })
};
    

exports.removeById = (req, res) => {
	UserModel.removeById(req.params.userId).then((result)=>{
	    res.status(204).send({});
	});
};
