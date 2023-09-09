import LoadingSkeletonList from "../components/LoadingSkeletonList";
function CreatorsList() {
    return (
        <div className="mt-5">
            <h2 className="text-2xl text-text-primary font-bold">All Deejays</h2>
            <div className="mt-1 ">
                <LoadingSkeletonList/>
            </div>
        </div>
    );
}

export default CreatorsList;