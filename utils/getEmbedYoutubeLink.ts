export const getEmbedYoutubeLink = (url: string) => {
    let videoId = '';

    if (url.includes('embed')) {
        return url;
    }

    if (url.includes('youtu.be')) {
        videoId = url.split('/').pop() as string;
    }

    if (url.includes('watch')) {
        videoId = new URL(url).searchParams.get('v') as string;
    }

    return `https://www.youtube.com/embed/${videoId}`;
};
