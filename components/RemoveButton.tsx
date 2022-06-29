import { useDispatch } from 'react-redux';
import { removeLaunch } from '../redux/launchesSlice';
import { AppDispatch } from '../redux/store';

interface RemoveButtonProps {
    id: string;
}

export const RemoveButton = ({ id }: RemoveButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => dispatch(removeLaunch(id));

    return (
        <>
            <button className={'remove'} onClick={handleClick}>
                ❌ Remove from list
            </button>

            <style jsx>{`
                .remove {
                    display: inline;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 14px;
                    opacity: 0.3;
                    transition: all 0.2s;
                }

                .remove:hover {
                    opacity: 1;
                }
            `}</style>
        </>
    );
};
