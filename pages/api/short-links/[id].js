export default function handler(request, response) {
    const { id } = request.query;

    switch (request.method) {
        case "GET":
            response.send(id);
            break;
        case "PATCH":
            response.send({
                ...request.body,
                id,
            })
            break;
        case "DELETE":
            response.status(204).send();
            break;
        default:
            response.status(404).send();
            break;
    }
}