export const flickrImageLoader = (size = '') => ({ src }: { src: string }) => {
    const urlParts = src.split('/');
    const fileName = urlParts.splice(-1, 1)[0];
    return [...urlParts, fileName.replace('_o', size)].join('/');
};
