
const assignPermissions = (role) => {

    switch (role) {
        case "customer":
            return ['read_prod'];
        case "admin":
            return ["read_prod", "create_prod", "update_prod", "delete_prod"];
        case "manager":
            return ["read_prod", "create_prod", "update_prod", "delete_prod","manage_roles"];
        default:
            return [];
    }
}  

module.exports = {
    assignPermissions
};