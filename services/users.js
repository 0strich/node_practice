const Users = require('../libs/users');

// 회원가입 (CREATE)
const createUser = async (data) => {
  const users = new Users(data);
  return await users.save();
};

// 회원정보 조회 (READ)
const getAllUsersInfo = async () => {
  return await Users.find({}).lean();
};

// 회원정보 수정 (UPDATE)
const updateUserNickName = async (userId, data) => {
  return await Users.findOneAndUpdate(
    {_id: userId},
    {$set: data},
    {upsert: false, new: true, useFindAndModify: false},
  )
};

// 회원 탈퇴 (DELETE)
const deleteUserInfo = async (_id) => {
  return await Users.deleteOne({_id}).lean();
};

const getUserInfo = async (nickName, email) => {
  return await Users.findOne({nickName, email}).lean();
}

module.exports.createUser = createUser;
module.exports.getAllUsersInfo = getAllUsersInfo;
module.exports.updateUserNickName = updateUserNickName;
module.exports.deleteUserInfo = deleteUserInfo;
module.exports.getUserInfo = getUserInfo;
