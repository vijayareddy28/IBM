/**
 * UserAppointments — CarePath AI
 * List existing appointments + book a new one.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle,
  Loader2, RefreshCw, ChevronDown, Building2, Stethoscope, X,
} from 'lucide-react';
import {
  fetchAppointments, bookAppointment, cancelAppointment,
  searchHospitals, searchProfessionals,
} from '../../services/userService';

const STATUS_COLORS = {
  PENDING:     'text-amber-700 bg-amber-50 border-amber-200',
  CONFIRMED:   'text-emerald-700 bg-emerald-50 border-emerald-200',
  COMPLETED:   'text-blue-700 bg-blue-50 border-blue-200',
  CANCELLED:   'text-gray-600 bg-gray-50 border-gray-200',
  REJECTED:    'text-red-700 bg-red-50 border-red-200',
  RESCHEDULED: 'text-purple-700 bg-purple-50 border-purple-200',
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_COLORS[status] || STATUS_COLORS.PENDING}`}>
    {status?.charAt(0) + status?.slice(1).toLowerCase()}
  </span>
);

const CONSULTATION_TYPES = [
  { value: 'IN_PERSON', label: 'In Person' },
  { value: 'VIDEO',     label: 'Video Call' },
  { value: 'PHONE',     label: 'Phone Call' },
  { value: 'CHAT',      label: 'Chat' },
];

// ── Book Appointment Modal ────────────────────────────────────────────────────
const BookModal = ({ onClose, onBooked }) => {
  const [form, setForm] = useState({
    date: '', time: '', reason: '', consultationType: 'IN_PERSON',
    hospitalId: '', professionalId: '', notes: '',
  });
  const [hospitals, setHospitals]     = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState(null);

  useEffect(() => {
    searchHospitals({ limit: 50 }).then((r) => setHospitals(r.data?.hospitals || [])).catch(() => {});
    searchProfessionals({ limit: 50 }).then((r) => setProfessionals(r.data?.professionals || [])).catch(() => {});
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.hospitalId && !form.professionalId) {
      setError('Please select a hospital or professional');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        date: form.date, time: form.time, reason: form.reason,
        consultationType: form.consultationType,
        notes: form.notes || undefined,
        hospitalId: form.hospitalId || undefined,
        professionalId: form.professionalId || undefined,
      };
      await bookAppointment(payload);
      onBooked();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Book Appointment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700 flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" required value={form.date} onChange={(e) => set('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Time *</label>
              <input type="time" required value={form.time} onChange={(e) => set('time', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Reason *</label>
            <textarea required rows={2} value={form.reason} onChange={(e) => set('reason', e.target.value)}
              placeholder="Describe your reason for the appointment..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Consultation Type</label>
            <select value={form.consultationType} onChange={(e) => set('consultationType', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {CONSULTATION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Hospital (optional)</label>
            <select value={form.hospitalId} onChange={(e) => set('hospitalId', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">— Select hospital —</option>
              {hospitals.map((h) => <option key={h._id} value={h._id}>{h.name} — {h.city}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Doctor / Professional (optional)</label>
            <select value={form.professionalId} onChange={(e) => set('professionalId', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">— Select professional —</option>
              {professionals.map((p) => <option key={p._id} value={p._id}>{p.name} — {p.specialization}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea rows={2} value={form.notes} onChange={(e) => set('notes', e.target.value)}
              placeholder="Any additional information..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Appointment Card ──────────────────────────────────────────────────────────
const AppointmentCard = ({ appt, onCancel }) => {
  const date = new Date(appt.date);
  const isPast = date < new Date();
  const canCancel = ['PENDING', 'CONFIRMED'].includes(appt.status);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {appt.time}
              {appt.consultationType && <span className="ml-2 text-gray-400">· {appt.consultationType.replace('_', ' ')}</span>}
            </p>
          </div>
        </div>
        <StatusBadge status={appt.status} />
      </div>

      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{appt.reason}</p>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        {appt.hospitalId && (
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" /> {appt.hospitalId.name}
          </span>
        )}
        {appt.professionalId && (
          <span className="flex items-center gap-1">
            <Stethoscope className="w-3 h-3" /> {appt.professionalId.name}
          </span>
        )}
      </div>

      {canCancel && !isPast && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button onClick={() => onCancel(appt._id)}
            className="text-xs text-red-600 hover:text-red-700 font-medium">
            Cancel appointment
          </button>
        </div>
      )}
    </div>
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────
const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal]               = useState(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [showBook, setShowBook]         = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const res = await fetchAppointments(params);
      setAppointments(res.data?.appointments || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await cancelAppointment(id, '');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your upcoming and past appointments.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load}
            className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:text-gray-700 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button onClick={() => setShowBook(true)}
            className="flex items-center gap-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Book
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              statusFilter === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}>
            {s || 'All'}
          </button>
        ))}
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
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-200 rounded-xl">
          <Calendar className="w-10 h-10 text-gray-200 mb-3" />
          <p className="text-sm font-medium text-gray-700">No appointments found</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Book your first appointment to get started.</p>
          <button onClick={() => setShowBook(true)}
            className="text-sm text-blue-600 underline font-medium">Book an appointment</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {appointments.map((a) => (
            <AppointmentCard key={a._id} appt={a} onCancel={handleCancel} />
          ))}
        </div>
      )}

      {showBook && (
        <BookModal
          onClose={() => setShowBook(false)}
          onBooked={() => { setShowBook(false); load(); }}
        />
      )}
    </div>
  );
};

export default UserAppointments;
