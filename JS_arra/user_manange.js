
class UserManagement {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
        console.log(`User ${user.name} added successfully.`);
    }


    removeUser(userId) {
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            const removedUser = this.users.splice(index, 1);
            console.log(`User ${removedUser[0].name} removed successfully.`);
        } else {
            console.log(`User with ID ${userId} not found.`);
        }
    }

    updateUserRole(userId, newRole) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.role = newRole;
            console.log(`User ${user.name}'s role updated to ${newRole}.`);
        } else {
            console.log(`User with ID ${userId} not found.`);
        }
    }


    listUsers() {
        console.log("Current Users:");
        this.users.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.name}, Role: ${user.role}, Age: ${user.age}`);
        });
    }

    
cloneUsers() {
    const clonedUsers = JSON.parse(JSON.stringify(this.users));
    console.log("Cloned Users:");
    console.log(clonedUsers);
    return clonedUsers;
}

// Insert multiple users at a specific index
insertUsersAt(index, newUsers) {
    this.users.splice(index, 0, ...newUsers);
    console.log(`${newUsers.length} users inserted at index ${index}.`);
}
}


function main() {
    const userManager = new UserManagement();


    userManager.addUser({ id: 1, name: 'Alamin', role: 'admin', age: 30 });
    userManager.addUser({ id: 2, name: 'Sabit', role: 'user', age: 25 });
    userManager.addUser({ id: 3, name: 'Fateh', role: 'editor', age: 28 });

    userManager.listUsers();


    userManager.removeUser(2);
    userManager.updateUserRole(3, 'supereditor');

    // Inserting multiple users
    userManager.insertUsersAt(1, [
        { id: 4, name: 'Rahmnan', role: 'guest', age: 22 },
        { id: 5, name: 'Basith', role: 'user', age: 27 }
    ]);


    userManager.listUsers();

    const clonedUsers = userManager.cloneUsers();
    console.log(clonedUsers);

    // Modifying the cloned list
    clonedUsers[0].name = 'Zara';
    console.log("Modified Cloned List:");
    console.log(clonedUsers);

    // Original list remains unaffected
    console.log("Original List After Cloning:");
    userManager.listUsers();

}
main(); 