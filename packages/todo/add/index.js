const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const connect = require('./mongodb-client');

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

    if (!args.content) {
      return {
        error: {
          statusCode: StatusCodes.BAD_REQUEST,
          body: {
            message: 'content is required'
          }
        }
      }
    }

    const client = await connect();
    const db = await client.db(process.env.DATABASE);
    const tasksCollection = await db.collection('todotasks');
    const res = await tasksCollection.insertOne({
      user_id: userId,
      content: args.content,
      done: false,
    });

    const insertedItem = res.ops[0];

    return {
      body: {
        task: insertedItem
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