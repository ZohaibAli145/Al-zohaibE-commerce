import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-40 right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-8000"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-float opacity-30"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-2000 opacity-30"></div>
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-4000 opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-yellow-400 rounded-full animate-float animation-delay-6000 opacity-30"></div>
      <div className="absolute top-1/2 left-32 w-2 h-2 bg-blue-400 rounded-full animate-float animation-delay-8000 opacity-30"></div>
      <div className="absolute top-1/3 right-40 w-3 h-3 bg-green-400 rounded-full animate-float animation-delay-10000 opacity-30"></div>
    </div>
  )
}

export default AnimatedBackground
