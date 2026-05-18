import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export default function Logo({ className = "", dark = false }: LogoProps) {
  return (
    <motion.div 
      whileHover="hover"
      className={`flex flex-col items-center ${className}`}
    >
      <svg 
        viewBox="0 0 300 200" 
        className="w-full h-auto drop-shadow-sm" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Oval Background - slightly tilted and dynamic */}
        <motion.ellipse 
          cx="150" cy="100" rx="140" ry="85" 
          fill={dark ? "#FFFFFF" : "#1B365D"} 
          variants={{
            hover: { rotate: 2, scale: 1.02 }
          }}
        />
        
        {/* Dolphin Silhouette - more accurate to the provided image */}
        <motion.path 
          d="M50 120C55 105 75 80 110 75C145 70 160 85 170 105C180 125 195 115 210 110C225 105 240 95 240 80C240 65 225 50 205 45C180 38 150 45 130 65C110 85 95 110 90 130C88 140 92 150 105 155C118 160 130 155 135 145L138 135" 
          stroke={dark ? "#1B365D" : "#5AC1E6"} 
          strokeWidth="12" 
          strokeLinecap="round" 
          variants={{
            hover: { pathLength: 1.1, x: 5, y: -2 }
          }}
        />

        {/* Waves below dolphin inside oval */}
        <motion.path 
          d="M130 145C150 138 170 152 190 145C210 138 230 152 250 145" 
          stroke={dark ? "#1B365D" : "#5AC1E6"} 
          strokeWidth="8" 
          strokeLinecap="round"
          variants={{
            hover: { x: [0, 5, 0], transition: { repeat: Infinity, duration: 2 } }
          }}
        />
        <motion.path 
          d="M140 165C160 158 180 172 200 165C220 158 240 172 260 165" 
          stroke={dark ? "#1B365D" : "#5AC1E6"} 
          strokeWidth="8" 
          strokeLinecap="round"
          variants={{
            hover: { x: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } }
          }}
        />

        {/* Text inside oval */}
        <text 
          x="200" 
          y="90" 
          className="font-black" 
          fill={dark ? "#1B365D" : "#FFFFFF"} 
          style={{ fontSize: '32px', fontFamily: '"Plus Jakarta Sans", sans-serif', textAnchor: 'middle' }}
        >
          <tspan x="200" dy="0">YOUNG</tspan>
          <tspan x="200" dy="35">DOLPHINS</tspan>
        </text>
      </svg>
      
      {/* Amsterdam text below */}
      <span className={`text-[12px] font-black uppercase tracking-[0.5em] mt-2 ${dark ? 'text-white' : 'text-[#1B365D]'}`}>
        Amsterdam
      </span>
    </motion.div>
  );
}
