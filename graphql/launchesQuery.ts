import { gql } from '@apollo/client';

export type LaunchesItem = {
    id: string;
    mission_name: string;
    launch_date_utc: string;
    links: {
        flickr_images: string[];
    };
};

export type LaunchesQueryData = {
    launchesPast: LaunchesItem[];
};

export type LaunchesQueryVars = {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: string;
};

export const LAUNCHES_QUERY = gql`
    query Launches($limit: Int, $offset: Int, $sort: String, $order: String) {
        launchesPast(
            limit: $limit
            offset: $offset
            sort: $sort
            order: $order
        ) {
            id
            launch_date_utc
            mission_name
            links {
                flickr_images
            }
        }
    }
`;
