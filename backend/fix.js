const db = require('./database/init');

db.run('UPDATE accounts SET balance = 50000 WHERE user_id = 1', function(err) {
  if (err) console.log('Error:', err);
  else console.log('Account balance updated!');
});