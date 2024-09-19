// init-mongo.js

// Initialize the replica set
rs.initiate({
  _id: 'rs0',
  members: [{ _id: 0, host: 'mongo:27017' }],
});

// Print the replica set configuration
rs.conf();

// Print the replica set status
rs.status();
