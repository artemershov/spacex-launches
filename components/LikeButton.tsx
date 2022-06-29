import { useDispatch, useSelector } from 'react-redux';
import { like, unlike, launchesSelector } from '../redux/launchesSlice';
import { AppDispatch } from '../redux/store';

interface LikeButtonProps {
    id: string;
}

export const LikeButton = ({ id }: LikeButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { favoritesIDs } = useSelector(launchesSelector);

    const isInFavorites = favoritesIDs.includes(id);

    const handleClick = () => dispatch(isInFavorites ? unlike(id) : like(id));

    return (
        <>
            <button
                className={isInFavorites ? 'like active' : 'like'}
                onClick={handleClick}
            >
                🤍
            </button>

            <style jsx>{`
                .like {
                    display: block;
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    background: black;
                    border: 5px solid palevioletred;
                    font-size: 24px;
                    transition: all 0.2s;
                }

                .like:hover {
                    transform: scale(1.2);
                }

                .like.active {
                    background: palevioletred;
                }
            `}</style>
        </>
    );
};
