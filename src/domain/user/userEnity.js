class UserEnity{
    constructor({username,password}){
        if(!username || !password) throw new Error("Kullanıcı adı veya Şifre Girilmemiş")
        this.username = username
        this.password = password
    }
}


module.exports = UserEnity