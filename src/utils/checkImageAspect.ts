const checkImageAspect = (file: File): Promise<{width: number, height: number}> => {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            const result = {width: image.naturalWidth, height: image.naturalHeight};
            resolve(result);
        }
        image.src = URL.createObjectURL(file);
    });
};

export default checkImageAspect;
