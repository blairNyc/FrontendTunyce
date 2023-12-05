import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useUploadAdvertContentMutation} from '../../app/api/GlobalApiSlice';
import axios from 'axios';

interface UploadAdvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: FormData) => void;
}

interface FormValues {
  name: string;
  media: FileList; // Assuming File is a valid type for your media field
  description: string;
}

interface Genre {
  id: number;
  name: string;
  image: string;
  description: string;
  genreId: number;
}



const UploadAdvertModal: React.FC<UploadAdvertModalProps> = ({ isOpen, onClose }) => {

  const [uploadContent] = useUploadAdvertContentMutation()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/genres'); // Replace with your actual API endpoint
        setGenres(response.data.message);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [setValue]);

  useEffect(() => {
    // Set default value for genreId to the first genre in the list
  }, [genres, setValue]);


  const uploadFileToCloudflare = async (file: File): Promise<string> => {
    const apiKey = "JYP_aCZwf7ecoir0eURKNMIascHPuV3sWQl4HCdQ";
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/50b610db010a3a760608a57bea528f88/stream`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (response.ok) {
        if (data.success) {
            const playback = data.result.playback;
            const videoUrl = playback.hls; // or playback.dash depending on your preferred streaming format
            return videoUrl;
        } else {
            throw new Error("Failed to upload file to Cloudflare Stream");
        }
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
};


  const onSubmit: SubmitHandler<FormValues> = async (data) => {

      
      const videoLink = await uploadFileToCloudflare(data?.media[0]);
      console.log(videoLink)
      // formData.append('video', videoLink);

    const videoObject = {
      title: `${data.name}`,
      link: `${videoLink}`,
      type:`video`,
      duration:`${12}`,
      description: `${data.description}`,
      // genres : `${data.genreId}`
    }


    try {
     const response = await uploadContent(videoObject)
     console.log(response)


    } catch (error) {
     
//      console.error('Error:', error);
    }

  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="modal-container rounded-3xl bg-white w-96 md:w-1/2 mx-auto rounded shadow-lg z-50">
        <div className="modal-content p-4 text-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Upload Advert</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter Title"
                {...register('name')} 
                />
              <p className='text-xs text-rose-600'>{errors.name?.message}</p>
            </div>
           
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter description"
                {...register('description')} />
              <p className='text-xs text-rose-600'>{errors.description?.message}</p>
            </div>
              <div className="mb-4">
              <input
                type="file"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter description"
                {...register("media", { required: true })} />
              <p className='text-xs text-rose-600'>{errors.media?.message}</p>
            </div>

           
            
          
            <button 
              type="submit"
              className="mt-4 bg-orange-500 w-60 text-white py-2 px-4 rounded-2xl hover:bg-orange-600"
              >Submit</button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default UploadAdvertModal;
