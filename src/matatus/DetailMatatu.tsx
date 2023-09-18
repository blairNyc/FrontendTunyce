import { MdModeEdit } from "react-icons/md";
const DetailMatatu = () => {
  return (
    <>
      <div className="container flex flex-col">
        <div className="">
          <h4>KAA 123A</h4>
        </div>
        <div className="">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid-rows-2">
              <div className="bg-slate-200 shadow h-32 w-32">
                <h2>Inferior</h2>
              </div>
              <div className="bg-slate-200 shadow h-32 w-32">
                <h2>Exterior</h2>
              </div>
            </div>
            <div className="bg-slate-200 shadow h-24 w-24 flex flex-col">
              <h4>Matatu</h4>
              <ul>
                <li>
                  Name{" "}
                  <button className="mr-3">
                    <MdModeEdit />
                  </button>
                </li>
                <li>
                  Number Plate{" "}
                  <button className="mr-3">
                    <MdModeEdit />
                  </button>
                </li>
                <li>
                  Driver Name{" "}
                  <button className="mr-3">
                    <MdModeEdit />
                  </button>
                </li>
                <li>
                  No of Seats
                  <button className="mr-3">
                    <MdModeEdit />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailMatatu;
