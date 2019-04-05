import { Handler, APIGatewayEvent, Context } from 'aws-lambda';

const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
    let response;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world!!',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
    return response;
};

export { handler };