import template from "./template/top";
import make from "./make";

const makeTop = async (project: any): Promise<Uint8Array> => {
    const start = project.start ? new Date(project.start) : null;
    const end = project.end ? new Date(project.end) : null;

    const inputs = [{
        "title": project.title,
        "place": project.place,
        "start_year": start ? start.getFullYear().toString() : '',
        "start_month": start ? (start.getMonth() + 1).toString() : '',
        "start_day": start ? start.getDate().toString() : '',
        "end_year": end ? end.getFullYear().toString() : '',
        "end_month": end ? (end.getMonth() + 1).toString() : '',
        "end_day": end ? end.getDate().toString() : '',
        "builder": project.builder
    }];

    return await make(template, inputs);
};

export default makeTop;