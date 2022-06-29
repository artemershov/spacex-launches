import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import type { AppProps } from 'next/app';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export type ApolloClientType = ReturnType<typeof createApolloClient>;

let apolloClient: ApolloClientType;

const createApolloClient = () =>
    new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        ssrMode: typeof window === 'undefined',
        cache: new InMemoryCache(),
    });

export const initializeApollo = (initialState = null) => {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract();

        const data = merge(existingCache, initialState, {
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') {
        return _apolloClient;
    }

    if (!apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
};

export function addApolloState(
    client: ApolloClientType,
    pageProps: AppProps['pageProps']
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: AppProps['pageProps']) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    return useMemo(() => initializeApollo(state), [state]);
}
