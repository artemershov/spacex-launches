import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import type { AppProps, AppContext } from 'next/app';
import { useRedux, addReduxState, initializeRedux } from '../redux/store';
import { setFavorites } from '../redux/launchesSlice';
import { useApollo } from '../graphql/apolloClient';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const client = useApollo(pageProps);
    const store = useRedux(pageProps);

    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const redux = initializeRedux();
    const appProps = await App.getInitialProps(appContext);

    const favoritesResponse = await fetch(
        'https://www.random.org/integers/?num=10&min=90&max=110&col=1&base=10&format=plain&rnd=new'
    );
    const favoritesText = await favoritesResponse.text();
    const favoritesIDs = favoritesText.split('\n');

    redux.dispatch(setFavorites(favoritesIDs));

    return addReduxState(redux.getState(), { ...appProps });
};

export default MyApp;
