function fetchX() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const x = Math.floor(Math.random() * 4);
      if(x === 0) {
        //reject(new Error('no zeros allowed'))
        throw new Error('no zeros allowed')
      }
      console.log('resolving x: ', x);
      resolve(x);
    }, 1000);
  });
}

function fetchY() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const y = Math.floor(Math.random() * 4);
      if(y === 0) {
        reject('no zeros allowed');
        //reject(new Error('no zeros allowed'))
      }
      console.log('resolving y: ', y);
      resolve(y);
    }, 2000);
  });
}

function add(xPromise,yPromise) {
  return Promise.all( [xPromise, yPromise] )
    .then( 
      function(values){
        console.log('returning values from add: ', values[0], ' ', values[1]);
        return values[0] + values[1];
      },
      function(rejection) {
        console.log('in rejection')
        console.log(rejection);
      }
    );
 }

add( fetchX(), fetchY() )
  .then( 
    function(sum){
      console.log('in continuation of add function')
      console.log( sum ); // that was easier!
    },
    function(rej) {
      console.log('in rejection of add function: ', rej)
    }
  ).catch(err => console.log('caught error: ', err));



//=====================================================================

  function callMultiple(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('x is: ', x)
        resolve(x);
      }, x);
    });
  }

  const callOne = callMultiple(1000);
  const callTwo = callMultiple(500);

  callOne.then((result) => {
    console.log('callOne then x is: ', result)
  });

  callTwo.then((result) => {
    console.log('callTwo then x is: ', result)
  });