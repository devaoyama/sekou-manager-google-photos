import { NowRequest, NowResponse } from "@vercel/node/dist";
import makeTables from "../../utils/pdf/makeTables";
import makeTop from "../../utils/pdf/makeTop";
import merge from "../../utils/pdf/merge";
import fs from "fs";

export default async function handler(req: NowRequest, res: NowResponse) {
    // カレントディレクトリ
    const path = process.cwd();
    // ファイル名の一覧
    const filenames = fs.readdirSync(path);
    console.log(filenames);

    const body = JSON.parse(req.body);
    const top = await makeTop(body.project);
    const tables = await makeTables(body.data, body.project.id);
    const pdf = await merge([top, ...tables]);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/pdf');
    res.end(pdf);
}
