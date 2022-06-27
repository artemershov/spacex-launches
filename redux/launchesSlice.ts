import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { LaunchesItem } from '../graphql/launchesQuery';

export interface State {
    favoritesIDs: string[];
    launches: LaunchesItem[];
    launchesQueryOffset: number;
}

const initialState: State = {
    favoritesIDs: [],
    launches: [],
    launchesQueryOffset: 0,
};

export const slice = createSlice({
    name: 'launches',
    initialState,
    reducers: {
        like: (state, action: PayloadAction<string>) => {
            state.favoritesIDs.push(action.payload);
        },
        unlike: (state, action: PayloadAction<string>) => {
            state.favoritesIDs = state.favoritesIDs.filter(
                (item) => item !== action.payload
            );
        },
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.favoritesIDs = action.payload;
        },
        setLaunches: (state, action: PayloadAction<LaunchesItem[]>) => {
            state.launches = action.payload;
        },
        addLaunches: (state, action: PayloadAction<LaunchesItem[]>) => {
            state.launches = [...state.launches, ...action.payload];
        },
        removeLaunch: (state, action: PayloadAction<string>) => {
            state.launches = state.launches.filter(
                (item) => item.id !== action.payload
            );
        },
        setLaunchesQueryOffset: (state, action: PayloadAction<number>) => {
            state.launchesQueryOffset = action.payload;
        },
    },
});

export const {
    like,
    unlike,
    setLaunches,
    addLaunches,
    removeLaunch,
    setFavorites,
    setLaunchesQueryOffset,
} = slice.actions;

export const launchesSelector = (state: RootState) => state.launches;

export default slice.reducer;
