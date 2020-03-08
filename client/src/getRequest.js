import { useEffect } from 'react';

export function addBodyClass(className) {
    return () => useEffect(() => {
        document.body.classList.add(className);
        return () => { document.body.classList.remove(className); }
    });
}
