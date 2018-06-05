let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Tarik'
    };

    setTimeout((params) => {
        callback(user);
    }, 3000);
};

getUser(1, (userObject) => {
    console.log(userObject);
});