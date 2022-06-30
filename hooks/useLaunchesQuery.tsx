import { useDispatch, useSelector } from 'react-redux';
import { useQuery, NetworkStatus } from '@apollo/client';
import {
    LaunchesQueryData,
    LaunchesQueryVars,
    LAUNCHES_QUERY,
} from '../graphql/launchesQuery';
import {
    launchesSelector,
    addLaunches,
    setLaunches,
    setLaunchesQueryOffset,
} from '../redux/launchesSlice';
import { AppDispatch } from '../redux/store';

export const launchesQueryVars: LaunchesQueryVars = {
    limit: 10,
    offset: 0,
    sort: 'launch_date_utc',
    order: 'desc',
};

export const useLaunchesQuery = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { launches, launchesQueryOffset } = useSelector(launchesSelector);

    const { loading, fetchMore, networkStatus } = useQuery<
        LaunchesQueryData,
        LaunchesQueryVars
    >(LAUNCHES_QUERY, {
        variables: launchesQueryVars,
        notifyOnNetworkStatusChange: true,
    });

    const handleLoadMore = async () => {
        const offset =
            launchesQueryOffset + (launchesQueryVars.limit as number);
        const result = await fetchMore({ variables: { offset } });
        dispatch(setLaunchesQueryOffset(offset));
        dispatch(addLaunches(result.data.launchesPast));
    };

    return {
        launches,
        isLoading: loading,
        isLoadingMore: networkStatus === NetworkStatus.fetchMore,
        handleLoadMore,
    };
};
