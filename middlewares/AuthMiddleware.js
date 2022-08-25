const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //프론트에서 토큰을 가져오기
  const accessToken = req.header("accessToken"); // header 객체의 이름을 전달req.header()

  //검사해야 할 것
  //1. 사용자가 로그인을 하지 않고 댓글 작성을 하려는 경우
  if (!accessToken) return res.json({ error: "User not logged in :(" }); //토큰이 없는 경우

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      // 유효한 토큰인지 확인
      return next(); //요청을 계속 진행
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
