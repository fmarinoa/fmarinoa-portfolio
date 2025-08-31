import { useEffect, useState } from 'react';

interface Props {
  message: string;
  state: 'success' | 'failed';
  time: number; //ms
}

export default function Alert({ message, state, time }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), time);
    return () => clearTimeout(timer);
  }, [time]);

  if (!visible) return null;

  const bgColor = state === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColor = 'text-white';

  return (
    <div
      className={`fixed top-16 right-4 px-4 py-2 rounded shadow-md duration-300 transition-all
                  ${bgColor} ${textColor} 
                  ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
    >
      {message}
    </div>
  );
}
