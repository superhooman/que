import { useToaster } from 'react-hot-toast';
import { Stack } from '../../components/Stack';
import { Toast } from './components/Toast';

export const Toasts = () => {
    const { toasts, handlers } = useToaster({
        position: 'bottom-right'
    });

    const { startPause, endPause, calculateOffset, updateHeight } = handlers;

    return (
        <div
            onMouseEnter={startPause}
            onMouseLeave={endPause}
        >
            {toasts
                .map((toast) => {
                    const offset = calculateOffset(toast, {
                        gutter: 8,
                        defaultPosition: 'bottom-right',
                    });
                    return (
                        <Toast
                            key={toast.id}
                            updateHeight={updateHeight}
                            {...toast}
                            style={{
                                transform: `translateY(${-offset}px)`
                            }}
                        />
                    );
                })}
        </div>
    );
};
