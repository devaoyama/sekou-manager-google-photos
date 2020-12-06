import { NowRequest, NowResponse } from "@vercel/node/dist";
import makeTables from "../../utils/pdf/makeTables";
import makeTop from "../../utils/pdf/makeTop";
import merge from "../../utils/pdf/merge";
import fs from "fs";

export default async function handler(req: NowRequest, res: NowResponse) {
    let path = process.cwd();
    let filenames = fs.readdirSync(path + '/../');
    console.log(filenames);

    path = process.cwd();
    filenames = fs.readdirSync(path + '/.next/serverless/pages');
    console.log(filenames);

    const body = JSON.parse(req.body);
    const top = await makeTop(body.project);
    const tables = await makeTables(body.data, body.project.id);
    const pdf = await merge([top, ...tables]);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/pdf');
    res.end(pdf);
}
