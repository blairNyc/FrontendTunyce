import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUploadVideoContentMutation } from '../../app/api/GlobalApiSlice';
import axios from 'axios';

interface UploadAdvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: FormData) => void;
}

interface FormValues {
  name: string;
  media: string;
  description: string;
  genreId: number;
}

interface Genre {
  id: number;
  name: string;
  image: string;
  description: string;
  genreId: number;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  media: yup.string().url('Invalid URL').required('Media URL is required'),
  description: yup.string().required('Description is requhttps://tailwindcss.com/docs/text-colorired'),
  genreId: yup.number().required('Genre is required'),
});

const UploadAdvertModal: React.FC<UploadAdvertModalProps> = ({ isOpen, onClose }) => {

  const [uploadContent] = useUploadVideoContentMutation()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

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
    if (genres.length > 0) {
      setValue('genreId', genres[0].id);
    }
  }, [genres, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    const videoObject = {
      name: `${data.name}`,
      media: `${data.media}`,
      video_thumbnail: `https://unsplash.com/photos/dKeB0-M9iiA`,
      description: `${data.description}`,
      genres : `${data.genreId}`
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
                {...register('title')} />
              <p className='text-xs text-rose-600'>{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter youtube url"
                {...register('media')} />
              <p className='text-xs text-rose-600'>{errors.media?.message}</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="Enter description"
                {...register('description')} />
              <p className='text-xs text-rose-600'>{errors.description?.message}</p>
            </div>

            <div>
              
              <select 
                {...register('type')}
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
              >
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <p>{errors.genreId?.message}</p>
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
