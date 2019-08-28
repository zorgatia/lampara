const pytalk = require('pytalk');

const Predict = () => {
 
       
    let worker = pytalk.worker('test.py');
    worker.import('numpy')

    py.stdout.on( 'data', function( data ) {
        message += data.toString();
    });
    py.stderr.on( 'data', function( data ) {
        message += data.toString();
    });
    py.stderr.on( 'close', function( data ) {
        message += 'closed'
    });
   
   console.log(message)

};

module.exports = Predict;
