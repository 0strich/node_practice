const userService = require('../services/users');
const cwr = require('../utils/createWebResp');
const users = require('../libs/users');

// 회원가입 (CREATE)
const signUp = async (req, res) => {
  try {
    const {nickName, email, password} = req.body;
    const userForm = {nickName, email, password}
    const userData = await userService.createUser(userForm);

    cwr.createWebResp(res, 200, userData);
  } catch (err) {
    cwr.errorWebResp(res, 403, '회원가입 실패', error);
  }
};

// 모든 회원정보 조회 (READ)
const usersInfo = async (req, res) => {
  try {
    const data = await userService.getAllUsersInfo();
    cwr.createWebResp(res, 200, data);
  } catch (err) {
    cwr.errorWebResp(res, 403, '회원정보 조회 실패', error);
  }
};

// 회원정보 수정 (UPDATE)
const changeNickName = async (req, res) => {
  try {
    const {beforeNickName, afterNickName} = req.body;
    const userInfo = await userService.getUserInfo(beforeNickName);
    const changeForm = {
      nickName: afterNickName,
      email: userInfo.email,
      password: userInfo.password,
    }
    const updateData = await userService.updateUserNickName(userInfo._id, changeForm)

    cwr.createWebResp(res, 200, updateData);
  } catch (err) {
    cwr.errorWebResp(res, 403, '회원정보 수정 실패', error);
  }
};

// 회원탈퇴 (DELETE)
const deleteUser = async (req, res) => {
  try {
    const {nickName} = req.body;
    const {_id} = await userService.getUserInfo(nickName);

    const deleteData = await userService.deleteUserInfo(_id);
    cwr.createWebResp(res, 200, deleteData);
  } catch (err) {
    cwr.errorWebResp(res, 403, '회원 탈퇴 실패', error);
  }
};

module.exports.signUp = signUp;
module.exports.usersInfo = usersInfo;
module.exports.changeNickName = changeNickName;
module.exports.deleteUser = deleteUser;
