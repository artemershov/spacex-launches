// Size Suffixes
// https://www.flickr.com/services/api/misc.urls.html

export const flickrImageLoader =
    (size = '') =>
    ({ src }: { src: string }) => {
        const urlParts = src.split('/');
        const fileName = urlParts.splice(-1, 1).pop() as string;
        return [...urlParts, fileName.replace('_o', size)].join('/');
    };
