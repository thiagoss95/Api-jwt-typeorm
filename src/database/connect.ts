import { createConnection } from 'typeorm';

createConnection().then(() =>
  console.log('Successfuly connected to the database!'),
);
