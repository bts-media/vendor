import { useCallback, useState } from 'react';

/** Modal ochish/yopish boilerplate'ini yo'q qiladi. */
function useModalState(initial = false) {
    const [open, setOpen] = useState(initial);

    const onOpen = useCallback(() => setOpen(true), []);
    const onClose = useCallback(() => setOpen(false), []);
    const onToggle = useCallback(() => setOpen(prev => !prev), []);

    return { open, onOpen, onClose, onToggle };
}

export default useModalState;
