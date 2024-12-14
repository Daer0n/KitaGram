import { useState } from 'react';

type CallbackFunction = () => Promise<void>;

export const useFetching = (callback: CallbackFunction): [() => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};
