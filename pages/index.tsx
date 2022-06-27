import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '../components/Layout';
import { Loading } from '../components/Loading';
import { LikeButton } from '../components/LikeButton';
import { RemoveButton } from '../components/RemoveButton';
import {
    LaunchesQueryData,
    LaunchesQueryVars,
    LAUNCHES_QUERY,
} from '../graphql/launchesQuery';
import { initializeApollo, addApolloState } from '../graphql/apolloClient';
import { initializeRedux, addReduxState } from '../redux/store';
import { setLaunches } from '../redux/launchesSlice';
import { useLaunchesQuery, launchesQueryVars } from '../hooks/useLaunchesQuery';
import { formatDate } from '../utils/formatDate';
import { flickrImageLoader } from '../utils/flickrImageLoader';
import styles from '../styles/LaunchesHistory.module.css';

const LaunchesHistoryPage: NextPage = () => {
    const { launches, isLoading, isLoadingMore, handleLoadMore } =
        useLaunchesQuery();

    if (isLoading && !isLoadingMore) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className={styles.header}>SpaceX 🚀 Launches history</h1>

            <ul className={styles.list}>
                {launches.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <div className={styles.pin}>
                            <LikeButton id={item.id} />
                        </div>
                        <Link href={`/launch/${item.id}`}>
                            <a className={styles.itemBody}>
                                <h3 className={styles.date}>
                                    {formatDate(item.launch_date_utc)}
                                </h3>
                                <div className={styles.mission}>
                                    {item.mission_name}
                                </div>
                                {item.links.flickr_images.length > 0 && (
                                    <div className={styles.image}>
                                        <Image
                                            loader={flickrImageLoader()}
                                            src={item.links.flickr_images[0]}
                                            alt={item.mission_name}
                                            layout="responsive"
                                            width="500"
                                            height="500"
                                            objectFit="cover"
                                        />
                                    </div>
                                )}
                            </a>
                        </Link>
                        <div className={styles.remove}>
                            <RemoveButton id={item.id}/>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                className={styles.loadMore}
                onClick={handleLoadMore}
                disabled={isLoadingMore}
            >
                {isLoadingMore ? 'Loading...' : 'Load more'}
            </button>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const apolloClient = initializeApollo();
    const redux = initializeRedux();

    const {
        data: { launchesPast },
    } = await apolloClient.query<LaunchesQueryData, LaunchesQueryVars>({
        query: LAUNCHES_QUERY,
        variables: launchesQueryVars,
    });

    redux.dispatch(setLaunches(launchesPast));

    const withApolloProps = addApolloState(apolloClient, { props: {} });
    const withReduxProps = addReduxState(redux.getState(), { props: {} });

    return {
        props: {
            ...withApolloProps.props,
            ...withReduxProps.props,
        },
    };
};

export default LaunchesHistoryPage;
