var SecurityLib = function () {

  if (SecurityLib.caller != SecurityLib.getInstance) {
    throw new Error("This object cannot be instanciated");
  }

  this.authToken = null;
}

//create a singleton pattern to make sure it's a unique instance
SecurityLib.instance = null;
SecurityLib.getInstance = function () {
  if (this.instance === null) {
    this.instance = new SecurityLib();
  }
  return this.instance;
};


SecurityLib.prototype = {

  /**
   * This function is calling for the components code to make sure, the developer have setted the token
   * 
   * @param {*} next 
   */
  isAuth: function () {
    if (this.authToken && this.authToken.lenght > 0) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * calcule the token using a external func
   * 
   * @param {*} authToken 
   * @param {*} next 
   */
  setTokenApplyFunction(applyFunc, next) {
    let self = this;
    applyFunc((err, token) => {
      if (err) {
        next(err, null)
      } else {
        self.authToken = token;
        next();
      }
    })
  },
  setToken: function (authToken) {
    this.authToken = authToken;
    return this.authToken;
  },
  /**
   * 
   * @param {*} authToken 
   * @param {*} next 
   */
  logout: function (authToken, next) {
    if (this.authToken == authToken) {
      this.authToken = null;
      next();
    } else {
      next('The token you try to expire does not the same you\' login', null);
    }
  },
  /**
   * Expire the token
   * 
   * @param {*} authToken 
   * @param {*} next 
   */
  expireToken: function (authToken, next) {
    this.logout(authToken, next);
  }

}


exports = module.exports = SecurityLib.getInstance();