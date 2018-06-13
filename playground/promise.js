let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};

asyncAdd(1, 10)
    .then(
        (result) => {
            console.log('Result: ', result);
            console.log('Adding 33 to the result');
            return asyncAdd(result, 33);
        }
    ).then(
        (result) => {
            console.log('The final result is:', result);
        }
    ).catch(
        (errorMessage) => {
            console.log(errorMessage);
        }
    );

// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Hey, it worked');
//         reject('Unable to fulfill promise');
//     }, 2500);

// });

// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// });