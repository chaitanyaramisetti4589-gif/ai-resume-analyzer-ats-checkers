import { useRef, useState } from 'react';
import { FileText, UploadCloud, X, Sparkles, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface UploadSectionProps {
  onAnalyze: (file: File, jobDescription: string) => void;
  loading: boolean;
}

const ACCEPTED_TYPES = ['.pdf', '.docx'];
const ACCEPTED_MIME = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export function UploadSection({ onAnalyze, loading }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): boolean => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    return ACCEPTED_TYPES.includes(ext) || ACCEPTED_MIME.includes(f.type);
  };

  const handleFile = (f: File) => {
    if (validateFile(f)) {
      setFile(f);
      setDragError(false);
    } else {
      setDragError(true);
      setTimeout(() => setDragError(false), 3000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const canAnalyze = file && jobDescription.trim().length > 0 && !loading;

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">ResumeAI</span>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="gradient-text">AI Resume Analyzer</span>
          <br />
          <span className="text-white">& ATS Checker</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Upload your resume, paste the job description, and get an AI-powered ATS
          analysis in seconds.
        </p>
      </div>

      {/* Upload card */}
      <div className="glass-strong rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Drag & drop */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-3">
            Resume Upload
          </label>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileInput}
            className="hidden"
          />

          {!file ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={cn(
                'relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-10 text-center',
                isDragging
                  ? 'border-blue-400 bg-blue-500/10 scale-[1.02]'
                  : dragError
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/15 hover:border-white/30 hover:bg-white/[0.03]'
              )}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
                    isDragging ? 'bg-blue-500/20' : 'bg-white/5'
                  )}
                >
                  <UploadCloud
                    className={cn(
                      'w-7 h-7 transition-colors',
                      isDragging ? 'text-blue-400' : 'text-white/60'
                    )}
                  />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Drag & drop your resume here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse — PDF or DOCX only
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 animate-scale-in">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={removeFile}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Remove file"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
          )}
          {dragError && (
            <p className="text-sm text-red-400 mt-2">
              Invalid file type. Please upload a PDF or DOCX file.
            </p>
          )}
        </div>

        {/* Job description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-3">
            Job Description
          </label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="min-h-[160px] resize-y bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/60 focus-visible:ring-blue-500/50 rounded-xl text-sm leading-relaxed"
          />
        </div>

        {/* Analyze button */}
        <button
          onClick={() => file && onAnalyze(file, jobDescription)}
          disabled={!canAnalyze}
          className={cn(
            'gradient-btn w-full h-14 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2.5',
            !canAnalyze && 'opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 spinner" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
}
