import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import mongoose from "mongoose";

export default async function handler(request, response) {
    await dbConnect();
    // console.log(mongoose.connection.readyState);
    console.log(Object.keys(ShortLink.schema.paths));

    switch (request.method) {
        case "POST":
            const newShorkLink = await ShortLink.create(request.body); // 비동기작업이기때문에 await로 기다려주기
            response.status(201).send(newShorkLink);
            break;
        case "GET":
            const shorkLinks = await ShortLink.find()
            response.send(shorkLinks);
            break;
        default:
            response.status(404).send();
    }
}