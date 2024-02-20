class AuthService {
  constructor() {
    this.token = window.localStorage.getItem("lunar_token");
    this.user = JSON.parse(window.localStorage.getItem("lunar_user"));
  }

  check() {
    return !!this.token;
  }

  setUser(user) {
    window.localStorage.removeItem("lunar_user");
    window.localStorage.setItem("lunar_user", JSON.stringify(user));
    this.user = user;
    location.reload();
  }

  login(token, user) {
    window.localStorage.setItem("lunar_token", token);
    window.localStorage.setItem("lunar_user", JSON.stringify(user));
    this.token = token;
    this.user = user;
    location.reload();
  }

  logout() {
    window.localStorage.removeItem("lunar_token");
    window.localStorage.removeItem("lunar_user");
    location.reload();
  }
}

export default new AuthService();
