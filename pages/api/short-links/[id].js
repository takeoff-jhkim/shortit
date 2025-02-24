import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

export default async function handler(request, response) {
    await dbConnect();
    const { id } = request.query;

    switch (request.method) {
        case "GET":
            const shorkLink = await ShortLink.findById(id);
            response.send(shorkLink);
            break;
        case "PATCH":
            const updateShorkLink = await ShortLink.findByIdAndUpdate(id, request.body, { new: true, })
            response.send(updateShorkLink);
            break;
        case "DELETE":
            await ShortLink.findByIdAndDelete(id);
            response.status(204).send();
            break;
        default:
            response.status(404).send();
            break;
    }
}