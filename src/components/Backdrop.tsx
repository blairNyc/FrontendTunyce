
function Backdrop({children}:{children:React.ReactNode}) {
    return (
        <div className="w-screen z-20 left-0 absolute top-0 h-screen bg-black-rgba">
            {children}
        </div>
    );
}

export default Backdrop;