
const ChatMessage = ({ name, message , logo , emoji}) => {

  return (
    <div className='flex space-x-2 items-center p-2'>
      <p className='bg-slate-600 text-white px-4 py-3 rounded-full text-xs'>
        {logo}
      </p>
      <div className='flex flex-col mt-1'>
        <span className='text-base font-semibold'>{name+emoji}</span>
        <span className='text-sm'>{message+emoji}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
