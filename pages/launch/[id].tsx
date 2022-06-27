import type { NextPage, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { Layout } from '../../components/Layout';
import { Loading } from '../../components/Loading';
import { LikeButton } from '../../components/LikeButton';
import {
    LAUNCH_QUERY,
    Launch,
    LaunchQueryData,
    LaunchQueryVars,
} from '../../graphql/launchQuery';
import { initializeApollo } from '../../graphql/apolloClient';
import styles from '../../styles/Launch.module.css';
import { formatDate } from '../../utils/formatDate';
import { flickrImageLoader } from '../../utils/flickrImageLoader';
import { getEmbedYoutubeLink } from '../../utils/getEmbedYoutubeLink';

interface LaunchPageProps {
    launch: Launch;
}

interface LaunchPageParams extends ParsedUrlQuery {
    id: string;
}

const LaunchPage: NextPage<LaunchPageProps> = ({ launch }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loading />;
    }

    const { id } = router.query;

    return (
        <Layout>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        {formatDate(launch.launch_date_utc)}
                    </h1>
                    <h3 className={styles.mission}>{launch.mission_name}</h3>
                    <div className={styles.rocket}>
                        🚀 {launch.rocket.rocket_name}
                    </div>
                </div>
                <div className={styles.like}>
                    <LikeButton id={id as string} />
                </div>
            </div>

            {Boolean(launch.details) && (
                <div className={styles.details}>{launch.details}</div>
            )}

            {Boolean(launch.links.wikipedia) && (
                <div className={styles.links}>
                    <a
                        href={launch.links.wikipedia as string}
                        target="_blank"
                        rel="noreferrer"
                    >
                        🔗 Wikipedia
                    </a>
                </div>
            )}

            {launch.links.flickr_images.length > 0 && (
                <>
                    <h3>Photos</h3>
                    <div className={styles.images}>
                        {launch.links.flickr_images.map((src) => (
                            <Image
                                key={src}
                                loader={flickrImageLoader('_c')}
                                src={src}
                                alt={launch.rocket.rocket_name}
                                layout="responsive"
                                width="500"
                                height="500"
                                objectFit="cover"
                            />
                        ))}
                    </div>
                </>
            )}

            {Boolean(launch.links.video_link) && (
                <>
                    <h3>Video</h3>
                    <div className={styles.video}>
                        <iframe
                            src={getEmbedYoutubeLink(
                                launch.links.video_link as string
                            )}
                            frameBorder="0"
                        />
                    </div>
                </>
            )}
        </Layout>
    );
};

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as LaunchPageParams;
    const apolloClient = initializeApollo();

    const {
        data: { launch },
    } = await apolloClient.query<LaunchQueryData, LaunchQueryVars>({
        query: LAUNCH_QUERY,
        variables: { launchId: id },
    });

    return {
        props: { launch },
    };
};

export default LaunchPage;
