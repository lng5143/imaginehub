import { useEffect, useRef } from "react";

export default function Modal({children, onClose}) {
    const dialog = useRef(null);
    const modalMain = useRef(null);

    useEffect(() => {
        dialog.current.showModal();

        const handleClick = (e) => {
            if (!modalMain.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [onClose]);

    return (
        <dialog ref={dialog} className="h-4/6 w-4/6">
            <div ref={modalMain} className="h-full w-full">
                {children}
            </div>
        </dialog>
    )
}