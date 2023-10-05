
function Backdrop({children,close}:{children:React.ReactNode, close?:()=>void}) {
    return (
        <div onClick={close} className="w-screen z-20 left-0 overflow-hidden absolute top-0 h-screen bg-black-rgba">
            {children}
        </div>
    );
}

export default Backdrop;