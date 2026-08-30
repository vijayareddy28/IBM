/**
 * ExpertConsultations — CarePath AI
 * Independent Expert: consultation history and active sessions.
 * Static display — non-dynamic.
 */

import { MessageSquare, Calendar, Clock, CheckCircle, Loader2, Video, MessageCircle } from 'lucide-react';

const statusConfig = {
  PENDING:   { label: 'Pending',   cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  ACTIVE:    { label: 'Active',    cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  COMPLETED: { label: 'Completed', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  CANCELLED: { label: 'Cancelled', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const SAMPLE = [
  { id: 1, patient: 'Anjali Verma',   date: '2024-11-28', time: '10:00 AM', mode: 'Video',  status: 'COMPLETED', topic: 'Second opinion — oncology referral' },
  { id: 2, patient: 'Rakesh Pillai',  date: '2024-12-02', time: '03:00 PM', mode: 'Chat',   status: 'COMPLETED', topic: 'Escalation review — chronic pain' },
  { id: 3, patient: 'Sneha Reddy',    date: '2024-12-08', time: '11:30 AM', mode: 'Video',  status: 'ACTIVE',    topic: 'Independent expert opinion — cardiac' },
  { id: 4, patient: 'Mohan Das',      date: '2024-12-14', time: '09:00 AM', mode: 'Chat',   status: 'PENDING',   topic: 'Case escalation from hospital' },
];

const modeIcon = (mode) => mode === 'Video'
  ? <Video className="w-3.5 h-3.5" />
  : <MessageCircle className="w-3.5 h-3.5" />;

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
    <span className={`flex items-center justify-center w-11 h-11 rounded-xl ${color}`}>
      <Icon className="w-5 h-5" />
    </span>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const ExpertConsultations = () => {
  const completed = SAMPLE.filter((s) => s.status === 'COMPLETED').length;
  const active    = SAMPLE.filter((s) => s.status === 'ACTIVE').length;
  const pending   = SAMPLE.filter((s) => s.status === 'PENDING').length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Consultations</h1>
        <p className="text-sm text-gray-500 mt-0.5">Expert consultation sessions and case reviews</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} label="Total"     value={SAMPLE.length} color="bg-violet-50 text-violet-600" />
        <StatCard icon={CheckCircle}   label="Completed" value={completed}      color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={Loader2}       label="Active"    value={active}         color="bg-blue-50 text-blue-600" />
        <StatCard icon={Clock}         label="Pending"   value={pending}        color="bg-amber-50 text-amber-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Consultation History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Patient / Case', 'Topic', 'Date & Time', 'Mode', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SAMPLE.map((c) => {
                const s = statusConfig[c.status] || statusConfig.PENDING;
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
                          {c.patient.charAt(0)}
                        </span>
                        <span className="font-medium text-gray-800">{c.patient}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 max-w-xs truncate">{c.topic}</td>
                    <td className="px-5 py-3.5 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {c.date} · {c.time}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {modeIcon(c.mode)} {c.mode}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.cls}`}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Showing sample consultation records. Live data loads when cases are assigned to you.
      </p>
    </div>
  );
};

export default ExpertConsultations;
