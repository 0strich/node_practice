const userService = require('../services/users');
const cwr = require('../utils/createWebResp');
const bcrypt = require('bcrypt');
const generateJwtToken = require('../utils/functions/generateJwtToken')
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
    const data = await userService.getAllUsersInfo()
    cwr.createWebResp(res, 200, data);
  } catch (err) {
    cwr.errorWebResp(res, 403, '회원정보 조회 실패', error);
  }
};

// 회원정보 수정 (UPDATE)
const changeNickName = async (req, res) => {
  try {
    const {beforeNickName, afterNickName, email} = req.body;
    const userInfo = await userService.getUserInfo(beforeNickName, email);
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
    const {nickName, email} = req.body;
    const {_id} = await userService.getUserInfo(nickName, email);

    const deleteData = await userService.deleteUserInfo(_id);
    cwr.createWebResp(res, 200, deleteData);
  } catch (err) {
    cwr.errorWebResp(res, 403, '회원 탈퇴 실패', error);
  }
};

// 로그인 시도 (jwt 토큰 반환)
const tryLogin = async (req, res) => {
  try {
    const {nickName, email, password} = req.body;
    const userInfo = await userService.getUserInfo(nickName, email);

    // 회원정보가 있는지 검증
    if (userInfo._id) {
      // 비밀번호가 일치하는지 검증
      if (bcrypt.compareSync(password, userInfo.password)) {
        const jwtToken = generateJwtToken({nickName, email});
        
        cwr.createWebResp(res, 200, {jwtToken});
      } else {
        cwr.errorWebResp(res, 403, '패스워드가 일치하지 않습니다', error);
      }
    } else {
      cwr.errorWebResp(res, 404, '회원정보가 존재하지 않습니다', error);
    }
  } catch (err) {
    cwr.errorWebResp(res, 403, '로그인 실패', error);
  }
};

module.exports.signUp = signUp;
module.exports.usersInfo = usersInfo;
module.exports.changeNickName = changeNickName;
module.exports.deleteUser = deleteUser;
module.exports.tryLogin = tryLogin;
