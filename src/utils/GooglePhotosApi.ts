import { auth } from "./Firebase";

export const getRequest = async (path: string, accessToken: string) => {
    const requestInit: RequestInit = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    const response = await fetch('https://photoslibrary.googleapis.com/v1/' + path, requestInit);
    if (response.status === 401) await auth.signOut();
    return  await response.json();
};

export const postRequest = async (path: string, accessToken: string, body: string) => {
    const requestInit: RequestInit = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body
    };

    const response = await fetch('https://photoslibrary.googleapis.com/v1/' + path, requestInit);
    if (response.status === 401) await auth.signOut();
    return  await response.json();
};

export const uploadFile = async (accessToken: string, image) => {
    const requestInit: RequestInit = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'application/octet-stream',
            'X-Goog-Upload-Content-Type': 'image/jpeg',
            'X-Goog-Upload-Protocol': 'raw'
        },
        body: image
    };

    const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', requestInit)
    if (response.status === 401) await auth.signOut();
    return  await response.text();
};
