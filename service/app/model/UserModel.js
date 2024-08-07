class UserModel {
    constructor(user) {
        this.id = user.id,
        this.name = user.name,
        this.tell = user.tell,
        this.surname = user.surname,
        this.email = user.email,
        this.adress = user.adress,
        this.adm = user.adm,
        this.password = user.password
    }
  }
  
  module.exports = UserModel;