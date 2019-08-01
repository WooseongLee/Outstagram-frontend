export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("logInUser")) || false
}; //로그인 여부를 확인하는 isLoggedIn. 로그인된 유저가 있다면 true, 아니라면 false.

export const resolvers = {
  Mutation: {
    logIn: (_, { logInUser }, { cache }) => {
      localStorage.setItem("logInUser", logInUser); //로그인된 아이디를 파라미터 logInUser로 넘겨 받는다. 이후 localStorage "logInUser"로 저장.
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logOut: (_, __, { cache }) => {
      localStorage.removeItem("logInUser"); //localStorage에 저장된 로그인된 아이디 삭제.
      window.location.reload(); //브라우저를 새로고침. 로그아웃된 페이지로 만들기 위함.
      return null;
    }
  }
};
