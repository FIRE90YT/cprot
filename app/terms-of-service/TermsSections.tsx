'use client'
import { Metadata } from 'next';
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">

      <div className="max-w-7xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 orbitron-font">
            Términos de <span className="text-blue-600 dark:text-blue-400">servicio</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Ultima actualización: 28/10/2025
          </p>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center"
        >
          <iframe
            src="https://cdn.cprot.net/CPROT-LANDING/CPROT-Terminos-Servicio.pdf"
            className="w-full max-w-5xl h-[90vh] bg-white rounded-lg border-none shadow-lg"
          />
        </motion.div>
      </div>

    </div>
  );
}
