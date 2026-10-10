"use client";

import { motion } from "framer-motion";
import { Download, FileText, Presentation } from "lucide-react";

interface ResourceCardProps {
  title: string;
  type: "ppt" | "pdf";
  description: string;
  fileSize: string;
  downloadUrl: string;
  index: number;
}

export function ResourceCard({ title, type, description, fileSize, downloadUrl, index }: ResourceCardProps) {
  const Icon = type === "ppt" ? Presentation : FileText;
  const colorClass = type === "ppt" ? "bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-100" : "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-100";
  const iconColor = type === "ppt" ? "text-orange-600" : "text-blue-600";
  const glowColor = type === "ppt" ? "bg-orange-500/5" : "bg-blue-500/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-[10px] bg-white border border-slate-200 hover:shadow-xl hover:border-transparent transition-all p-8 flex flex-col overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div aria-hidden="true" className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none ${glowColor}`} />

      <div className={`w-14 h-14 rounded-[10px] flex items-center justify-center ${colorClass} mb-6 border transition-colors`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 leading-relaxed flex-grow text-sm">
        {description}
      </p>

      <div className="w-full flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{fileSize} • {type.toUpperCase()}</span>
        
        <a 
          href={downloadUrl}
          download
          aria-label={`Download ${title} (${type.toUpperCase()}, ${fileSize})`}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors rounded-[10px]"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
    </motion.div>
  );
}
