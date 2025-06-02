'use client';

import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { mockData } from '@/lib/mockData';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/navbar';

const COLORS = ['#e63946', '#9d4edd', '#43aa8b', '#4d96ff', '#f1fa8c'];

export default function Charts() {
  return (
    <>
      <Navbar />

      <motion.main
        className="min-h-screen bg-gray-50 dark:bg-zinc-800 text-white px-4 py-12 flex flex-col items-center transition-colors duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-black dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
         Data Visualization
        </motion.h1>

        <div className="w-full max-w-3xl h-96 bg-white-800 dark:bg-zinc-900 rounded-xl shadow-lg p-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive
                data={mockData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {mockData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.main>
    </>
  );
}
