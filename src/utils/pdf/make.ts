import fs from "fs";
import labelmake from "labelmake";
import { Template } from "labelmake/dist/types/type";

const make = async (template: Template, inputs: any): Promise<Uint8Array> => {
    const font = {
        "ipag": fs.readFileSync('fonts/ipag.ttf')
    };
    return await labelmake({ inputs, template, font });
};

export default make;
