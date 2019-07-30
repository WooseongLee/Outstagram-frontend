export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("logInUser")) || false
};

export const resolvers = {
  Mutation: {
    logIn: (_, { logInUser }, { cache }) => {
      localStorage.setItem("logInUser", logInUser);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logOut: (_, __, { cache }) => {
      localStorage.removeItem("logInUser");
      window.location.reload();
      return null;
    }
  }
};
