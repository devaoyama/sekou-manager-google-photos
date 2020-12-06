import fetch from "node-fetch";

const getDataFromUrl = async (url: string) => {
    const response = await fetch(url, { method: 'GET' });
    if (response.status !== 200) return '';
    return "data:" + response.headers.get("content-type") + ";base64," + Buffer.from(await response.buffer()).toString('base64');
};

export default getDataFromUrl;
