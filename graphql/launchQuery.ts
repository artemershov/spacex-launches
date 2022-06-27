import { gql } from '@apollo/client';

export type Launch = {
    id: string;
    launch_date_utc: string;
    details: string;
    mission_name: string;
    rocket: {
        rocket_name: string;
    };
    links: {
        wikipedia: string | null;
        video_link: string | null;
        flickr_images: string[];
    };
}

export type LaunchQueryData = {
    launch: Launch;
};

export type LaunchQueryVars = {
    launchId: string;
};

export const LAUNCH_QUERY = gql`
    query Launch($launchId: ID!) {
        launch(id: $launchId) {
            id
            launch_date_utc
            details
            mission_name
            rocket {
                rocket_name
            }
            links {
                wikipedia
                video_link
                flickr_images
            }
        }
    }
`;
