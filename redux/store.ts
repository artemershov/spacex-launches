import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app';
import launchesReducer from './launchesSlice';

export const REDUX_STATE_PROP_NAME = '__REDUX_STATE__';

export const createStore = (preloadedState = {}) =>
    configureStore({
        reducer: { launches: launchesReducer },
        preloadedState,
    });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let store: AppStore;

export const initializeRedux = (preloadedState?: RootState) => {
    const _store = store ?? createStore(preloadedState);

    if (!store) {
        store = _store;
    }

    return store;
};

export function addReduxState(
    state: RootState,
    pageProps: AppProps['pageProps']
) {
    if (pageProps?.props) {
        pageProps.props[REDUX_STATE_PROP_NAME] = state;
    }

    return pageProps;
}

export function useRedux(pageProps: AppProps['pageProps']) {
    const state = pageProps[REDUX_STATE_PROP_NAME];
    return useMemo(() => initializeRedux(state), [state]);
}
