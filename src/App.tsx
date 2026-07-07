import { useState } from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';
import { UploadSection } from '@/components/UploadSection';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import type { AnalysisResult, AppState } from '@/types/analysis';

const WEBHOOK_URL =
  'https://robojet.app.n8n.cloud/webhook/fbf87656-9e90-408d-81d1-49cd7a48dbfe';

function App() {
  const [state, setState] = useState<AppState>('upload');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (file: File, jobDescription: string) => {
    setLoading(true);
    setState('loading');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // n8n may wrap the payload in an array; unwrap if needed
      const payload: AnalysisResult = Array.isArray(data) ? data[0] : data;

      if (
        typeof payload.atsScore !== 'number' ||
        typeof payload.matchPercentage !== 'number'
      ) {
        throw new Error('Invalid response shape');
      }

      setResult(payload);
      setState('results');
    } catch (err) {
      console.error('Analysis failed:', err);
      setState('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setState('upload');
  };

  return (
    <div className="animated-bg min-h-screen w-full relative overflow-hidden">
      {/* Floating orbs */}
      <div
        className="orb w-[500px] h-[500px] bg-blue-600"
        style={{ top: '-10%', left: '-5%' }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-purple-600"
        style={{ bottom: '-10%', right: '-5%', animationDelay: '5s' }}
      />
      <div
        className="orb w-[300px] h-[300px] bg-indigo-500"
        style={{ top: '40%', right: '20%', animationDelay: '10s' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-10 md:py-16">
        {state === 'results' && result ? (
          <ResultsDashboard result={result} onReset={handleReset} />
        ) : state === 'error' ? (
          <div className="w-full max-w-md mx-auto text-center animate-fade-in-up">
            <div className="glass-strong rounded-2xl p-8 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Unable to analyze resume.
              </h2>
              <p className="text-muted-foreground mb-6">Please try again.</p>
              <button
                onClick={handleReset}
                className="gradient-btn h-12 px-6 rounded-xl text-white font-medium flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <UploadSection onAnalyze={handleAnalyze} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default App;
