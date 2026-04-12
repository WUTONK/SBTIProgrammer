import React, { useState, useEffect } from 'react';

const Loading = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  
  const phrases = [
    '正在遍历屎山代码...',
    '发现致命技术债...',
    '忽略所有的报错日志...',
    '正在重构底层逻辑...',
    '尝试重启服务器...',
    '连接失败...',
    'proxy = "127.0.0.1:7890"',
    '连接成功！',
    '编译完成，准备输出结果...'
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < phrases.length) {
        setMessages(prev => [...prev, phrases[currentIndex]]);
        currentIndex++;
      }
    }, 400); // Print a new phrase every 400ms

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (onComplete) {
        onComplete();
      }
    }, 3000); // 3 seconds total duration

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-xs text-gray-400 font-mono">bash - 80x24</div>
        </div>
        <div className="p-4 h-64 overflow-y-auto font-mono text-sm text-green-400">
          {messages.map((msg, index) => (
            <div key={index} className="mb-1">
              <span className="text-green-600">root@system:~#</span> {msg}
            </div>
          ))}
          <div className="animate-pulse">
            <span className="text-green-600">root@system:~#</span> _
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
