/**
 * HealthReports — CarePath AI
 * View uploaded health report metadata.
 * (Upload functionality requires file storage — listed here with appropriate guidance.)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Upload, AlertCircle, Loader2, RefreshCw, Info,
  Download, Eye, Clock, Calendar,
} from 'lucide-react';
import api from '../../services/api';

const HealthReports = () => {
  const [reports, setReports]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/user/reports');
      setReports(res.data?.data?.reports || []);
    } catch (err) {
      // Endpoint may not be implemented yet — show a helpful message
      if (err.response?.status === 404) {
        setReports([]);
      } else {
        setError(err.response?.data?.message || 'Failed to load reports');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Reports</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage your uploaded health documents.</p>
        </div>
        <button onClick={load}
          className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:text-gray-700 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Info about reports */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>About Health Reports:</strong> Upload your lab results, prescriptions, and medical documents. CarePath AI
            can analyse them (with your consent) and provide plain-language summaries. File upload will be enabled once your
            account is fully set up.{' '}
            <Link to="/user/consent" className="underline font-medium">Manage your consent preferences →</Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-xl text-center">
          <FileText className="w-10 h-10 text-gray-200 mb-3" />
          <p className="text-sm font-medium text-gray-700">No health reports yet</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            Your uploaded health documents will appear here once file upload is available.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-500 cursor-not-allowed">
            <Upload className="w-4 h-4" /> Upload Report (Coming Soon)
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
          {reports.map((r) => (
            <div key={r._id} className="flex items-start gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{r.fileName}</p>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                  {r.fileSize && <span>{formatSize(r.fileSize)}</span>}
                  {r.fileType && <span className="uppercase">{r.fileType}</span>}
                </div>
                {r.summary && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{r.summary}</p>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg transition-colors" title="View">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-emerald-600 rounded-lg transition-colors" title="Download">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthReports;
