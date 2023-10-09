const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone_number: String
});

const User = mongoose.model('Users', userSchema);

exports.createUser = async (userData) => {
    const user = await new User(userData);
    return user.save();
};

exports.findById = async (id) => {
	return await User.findById(id).then((result) => {
        result = result.toJSON();
        delete result.__v;
        return result;
	});
};
exports.patchUser = async (id, userData) => {
	return await User.findOneAndUpdate({
		_id: id
	}, userData);
};

exports.list = async (perPage, page,searchText) => {
    console.log(searchText)
    return await User.find({ $or:[ {'phone_number':{$regex: searchText, $options: 'i'}},{'name':{$regex: searchText, $options: 'i'}}, {'email':{$regex: searchText, $options: 'i'}}]}).limit(perPage).skip(perPage * page).then((result) => {
        return result;
	});
	
};

exports.TotalUsersCount = async (searchText) => {
    return await User.count({ $or:[ {'phone_number':{$regex: searchText, $options: 'i'}},{'name':{$regex: searchText, $options: 'i'}}, {'email':{$regex: searchText, $options: 'i'}}]})
    // return await User.count();
	
};

exports.removeById = async (userId) => {
    return await User.deleteOne({ _id: userId }).then((result) => {
        return true;
	}).catch(function(error){
        console.log(error); // Failure
    });

};
