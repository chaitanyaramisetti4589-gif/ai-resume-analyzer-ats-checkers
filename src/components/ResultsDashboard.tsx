import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  FileText,
  Lightbulb,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import type { AnalysisResult } from '@/types/analysis';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Analysis Results</h2>
            <p className="text-sm text-muted-foreground">
              Your AI-powered ATS report is ready
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="gradient-btn h-11 px-5 rounded-xl text-white font-medium text-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another Resume
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
        {/* Card 1 - ATS Score */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
          <CircularProgress
            value={result.atsScore}
            label="ATS Score"
            sublabel="Applicant Tracking System"
            gradientId="ats-grad"
            fromColor="#3b82f6"
            toColor="#8b5cf6"
          />
        </div>

        {/* Card 2 - Job Match */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
          <CircularProgress
            value={result.matchPercentage}
            label="Job Match"
            sublabel="Resume vs. Job Description"
            gradientId="match-grad"
            fromColor="#a78bfa"
            toColor="#60a5fa"
          />
        </div>

        {/* Card 3 - Matched Skills */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Matched Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills.length > 0 ? (
              result.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No matched skills.</p>
            )}
          </div>
        </div>

        {/* Card 4 - Missing Skills */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.length > 0 ? (
              result.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-300"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No missing skills.</p>
            )}
          </div>
        </div>

        {/* Card 5 - Strengths */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Strengths</h3>
          </div>
          <div className="space-y-2.5">
            {result.strengths.length > 0 ? (
              result.strengths.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3.5 py-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/90 leading-relaxed">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No strengths identified.</p>
            )}
          </div>
        </div>

        {/* Card 6 - Weaknesses */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Weaknesses</h3>
          </div>
          <div className="space-y-2.5">
            {result.weaknesses.length > 0 ? (
              result.weaknesses.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3.5 py-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/90 leading-relaxed">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No weaknesses identified.</p>
            )}
          </div>
        </div>

        {/* Card 7 - Summary */}
        <div className="glass rounded-2xl p-6 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Resume Summary</h3>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              {result.summary}
            </p>
          </div>
        </div>

        {/* Card 8 - Suggestions */}
        <div className="glass rounded-2xl p-6 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Suggestions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.suggestions.length > 0 ? (
              result.suggestions.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3"
                >
                  <div className="w-5 h-5 rounded-md border-2 border-indigo-400/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No suggestions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
