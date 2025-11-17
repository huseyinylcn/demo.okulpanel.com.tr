const UserEnity = require("./../../domain/user/userEnity")


async function login(data,{userRepository,jwtService}) {
    
    data = await new UserEnity(data)
   
    let result = await userRepository.login(data)

   if(!result) return false
    let token = jwtService.generateToken(result)
   return {token:token,rol:result.rol}
    
}

module.exports = login