import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SignModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const modalAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 800, damping: 20 } },
    exit: { scale: 0.8, opacity: 0, transition: { type: "spring", stiffness: 100, damping: 30 } },
  };

  if (!isOpen) return null;

  const ButtonStyle = ({ text, to }: { text: string; to: string }) => (
    <Link to={to}>
      <button className='w-full rounded-md hover:bg-red-600 my-3 font-bold uppercase text-white bg-text-primary py-3'>
        {text}
      </button>
    </Link>
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        className="relative bg-gradient-to-t from-gray-400 via-gray-400 to-white ... p-6 rounded-3xl"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalAnimation}
      >
        <button className="absolute top-2 right-4 text-gray-600 w-fit h-fit " onClick={onClose}>
          Close
        </button>
        <div className="flex justify-center items-center space-x-8">
          <img src="/Q.png" alt="tunyce media" className="w-1/3 rounded-3xl" />
          <div className="ml-4">
            <p>Start listening with a Tunyce Account</p>
            <h2 className="text-2xl w-fit font-bold hover:text-orange-500">
              <a href="/signup">
                Sign Up
              </a>
            </h2>
            <p>Download App</p>
            <p className="text-sm">Already have an account?</p>
            <ButtonStyle text='Sign In' to='/login' />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignModal;
