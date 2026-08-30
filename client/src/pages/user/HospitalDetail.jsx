/**
 * HospitalDetail — CarePath AI
 * View a single hospital's full profile.
 */

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Building2, MapPin, Phone, Mail, Shield, Stethoscope,
  ArrowLeft, Loader2, AlertCircle, CheckCircle, Calendar,
} from 'lucide-react';
import { fetchHospitalById } from '../../services/userService';

const Tag = ({ label, color = 'blue' }) => {
  const colors = {
    blue:    'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    orange:  'bg-orange-50 text-orange-700 border-orange-100',
  };
  return (
    <span className={`text-xs border rounded-full px-2.5 py-1 ${colors[color]}`}>{label}</span>
  );
};

const HospitalDetail = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchHospitalById(id)
      .then((r) => setHospital(r.data?.hospital))
      .catch((err) => setError(err.response?.data?.message || 'Hospital not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
    </div>
  );

  if (error || !hospital) return (
    <div className="space-y-4">
      <Link to="/user/hospitals" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to hospitals
      </Link>
      <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" /> {error || 'Hospital not found'}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <Link to="/user/hospitals" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to hospitals
      </Link>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{hospital.name}</h1>
              {(hospital.city || hospital.country) && (
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {[hospital.city, hospital.state, hospital.country].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
            {hospital.emergencyAvailable && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                <Shield className="w-3 h-3" /> Emergency 24/7
              </span>
            )}
          </div>
        </div>

        {hospital.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{hospital.description}</p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {hospital.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-gray-400" /> {hospital.phone}</span>}
          {hospital.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-gray-400" /> {hospital.email}</span>}
        </div>
      </div>

      {/* Specialties */}
      {hospital.specialties?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-blue-600" /> Medical Specialties
          </h2>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((s) => <Tag key={s} label={s} color="blue" />)}
          </div>
        </div>
      )}

      {/* Services */}
      {hospital.services?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Services Offered</h2>
          <div className="flex flex-wrap gap-2">
            {hospital.services.map((s) => <Tag key={s} label={s} color="emerald" />)}
          </div>
        </div>
      )}

      {/* Facilities */}
      {hospital.facilities?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Facilities</h2>
          <div className="flex flex-wrap gap-2">
            {hospital.facilities.map((f) => <Tag key={f} label={f} color="orange" />)}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link to="/user/appointments"
        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors">
        <Calendar className="w-4 h-4" /> Book an Appointment at this Hospital
      </Link>
    </div>
  );
};

export default HospitalDetail;
