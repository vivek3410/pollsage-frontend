import React, { useEffect } from 'react';

export default function useTabVisibility(onTabVisible, onTabHidden) {
    const handleVisibilityChange = () => {
        if (document.hidden) {
            if (onTabHidden) {
                onTabHidden();
            }
        } else {
            if (onTabVisible) {
                onTabVisible()
            }
        }
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [onTabVisible, onTabHidden])
}
