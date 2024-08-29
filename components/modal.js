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
    }, []);

    return (
        <dialog ref={dialog}>
            <div ref={modalMain}></div>
            {children}
        </dialog>
    )
}