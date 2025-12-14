const UserEnity = require("./../../domain/user/userEnity")


async function login(data, { userRepository, jwtService }) {

    data = await new UserEnity(data)

    let result = await userRepository.login(data)

    const initialDate = new Date();
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    const newDate = new Date(initialDate.getTime() + threeHoursInMs);
    result.time = newDate



    if (!result) return false
    let token = jwtService.generateToken(result)
    return { token: token, rol: result.rol }

}

module.exports = login