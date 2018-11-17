import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const connect = async (url, options) => {
  const { connection } = await mongoose.connect(
    url,
    options,
  );

  connection.on('error', err => {
    console.log(err);
  });

  return connection;
};

export const disconnect = () => mongoose.disconnect();

export default { connect, disconnect };
