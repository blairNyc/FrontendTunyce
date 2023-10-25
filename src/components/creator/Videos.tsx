import { Content } from './MyContent';
interface Props{
    content:Content[]
}
export default function Videos({content}:Props){
    console.log(content,'content');
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          content && content.length === 0 && (
            <div className=" text-black text-center text-lg">No videos uploaded yet</div>
          )
        }
        {content && content.length>0&& content.map((content) => (
          <div key={content.id} className="bg-white p-4 rounded shadow-md">
            {/* <img src={video.thumbnail} alt={video.title} className="w-full" /> */}
            {/* <h2 className="text-lg font-semibold mt-2">{video.title}</h2> */}
            {/* Add other video information as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
