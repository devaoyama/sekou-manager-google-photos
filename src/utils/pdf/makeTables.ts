import template from "./template/table";
import make from "./make";
import getDataFromUrl from "../getGooglePhotoImageFromUrl";
import { db } from "../Firebase";

const makeTables = async (data: any[], projectId: string): Promise<Uint8Array[]> => {
    const mergedPdf = [];
    let inputs;
    let limit = 1;
    let count = 1;
    for (const item of data) {
        const doc = await db
            .collection('projects')
            .doc(projectId)
            .collection('workloads')
            .doc(item.id)
            .get()
        ;
        const workload = doc.data();

        if (limit === 1) {
            inputs = {
                "img_1": "",
                "num_1": "",
                "title_1": "",
                "comment_1": "",
                "img_2": "",
                "num_2": "",
                "title_2": "",
                "comment_2": "",
                "img_3": "",
                "num_3": "",
                "title_3": "",
                "comment_3": ""
            };
        }

        const url = item.url;
        // @ts-ignore
        inputs[`img_${limit}`] = url ? await getDataFromUrl(url) : "";
        // @ts-ignore
        inputs[`num_${limit}`] = count.toString();
        // @ts-ignore
        inputs[`title_${limit}`] = workload.title;
        // @ts-ignore
        inputs[`comment_${limit}`] = workload.comment;
        if (count === 3 || data.length === count) {
            // pdfを作成
            mergedPdf.push(await make(template, [inputs]));
            limit = 1;
        } else {
            limit++;
        }
        count++;
    }

    return mergedPdf;
};

export default makeTables;
