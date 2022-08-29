const connect = require('./mongodb-client');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

async function main(args) {
  try {
    const userId = args.__ow_headers['x-user-id'];
    if (!userId) {
      return {
        error: {
          statusCode: StatusCodes.UNAUTHORIZED,
          body: {
            message: 'user id header required'
          }
        }
      }
    }

    const client = await connect();
    const db = await client.db(process.env.DATABASE);
    const tasksCollection = await db.collection('todotasks');
    const tasks = await tasksCollection.find({ user_id: userId }).toArray();

    return {
      body: {
        tasks
      }
    }
  } catch (error) {
    console.error(error)
    return {
      error: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        }
      }
    }
  }
}

exports.main = main;