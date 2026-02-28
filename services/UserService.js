class UserService {
    getUser(id) {
        const users = {
            1: { name: "Karen", role: "Estudiante" },
            2: { name: "Juan", role: "Profesor" }
        };
        return users[id] || null;
    }
}

module.exports = UserService;