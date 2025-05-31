import { motion } from 'framer-motion';

export const EditToast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -50, scale: 0.9 }}
    className={`fixed top-4 right-4 z-[100] p-4 rounded-lg shadow-lg flex items-center gap-3 ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}
  >
    <span className="text-lg">
      {type === 'success' ? '✅' : '❌'}
    </span>
    <span>{message}</span>
    <button
      onClick={onClose}
      className="ml-2 text-white hover:text-gray-200 font-bold"
    >
      ×
    </button>
  </motion.div>
);