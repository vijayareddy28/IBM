/**
 * EmergencyPage — CarePath AI
 * Quick-access emergency guidance and contacts.
 */

import { Link } from 'react-router-dom';
import {
  AlertTriangle, Phone, Building2, Heart, Zap, Activity,
  ShieldAlert, Info,
} from 'lucide-react';

const EmergencyCard = ({ icon: Icon, color, title, description, action }) => (
  <div className={`border rounded-xl p-5 ${color}`}>
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5"><Icon className="w-5 h-5" /></div>
      <div>
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs leading-relaxed opacity-90">{description}</p>
        {action}
      </div>
    </div>
  </div>
);

const EMERGENCY_SIGNS = [
  'Chest pain or pressure', 'Difficulty breathing or shortness of breath',
  'Sudden severe headache', 'Sudden numbness or weakness in face, arm, or leg',
  'Confusion or trouble speaking', 'Severe abdominal pain',
  'Uncontrolled bleeding', 'Loss of consciousness',
  'Severe allergic reaction (anaphylaxis)', 'High fever (above 40°C / 104°F)',
];

const FIRST_AID = [
  { title: 'CPR — Adult', steps: ['Call emergency services immediately (999/911/112)', 'Lay the person flat on their back', 'Give 30 chest compressions at the centre of the chest', 'Give 2 rescue breaths', 'Repeat until help arrives or person recovers'] },
  { title: 'Choking', steps: ['Encourage the person to cough', 'Give up to 5 firm back blows between shoulder blades', 'If unsuccessful: 5 abdominal thrusts (Heimlich manoeuvre)', 'Alternate back blows and abdominal thrusts', 'Call emergency services if blockage is not cleared'] },
  { title: 'Severe Bleeding', steps: ['Apply firm pressure with a clean cloth or bandage', 'Keep pressure continuously for at least 10 minutes', 'Do not remove the cloth — add more on top if soaked', 'Elevate the injured limb if possible', 'Call emergency services for serious wounds'] },
];

const EmergencyPage = () => (
  <div className="space-y-6 max-w-3xl">
    {/* Banner */}
    <div className="bg-red-600 text-white rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <ShieldAlert className="w-6 h-6" />
        <h1 className="text-xl font-bold">Emergency Help</h1>
      </div>
      <p className="text-sm opacity-90 mb-4">
        If this is a life-threatening emergency, call your local emergency number immediately.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { country: 'International', number: '112' },
          { country: 'USA / Canada', number: '911' },
          { country: 'UK',           number: '999' },
        ].map((e) => (
          <div key={e.country} className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-xs opacity-80 mb-1">{e.country}</p>
            <p className="text-2xl font-bold">{e.number}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Warning signs */}
    <div>
      <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-red-500" /> Warning Signs — Call Emergency Services
      </h2>
      <div className="bg-white border border-red-200 rounded-xl p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {EMERGENCY_SIGNS.map((sign) => (
            <li key={sign} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-red-500 mt-1 shrink-0">•</span> {sign}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Quick actions */}
    <div>
      <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EmergencyCard
          icon={Building2} color="border-blue-200 bg-blue-50 text-blue-900"
          title="Find Nearest Hospital"
          description="Locate a verified hospital with emergency services in your area."
          action={
            <Link to="/user/hospitals" className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 mt-2 underline">
              Find hospitals →
            </Link>
          }
        />
        <EmergencyCard
          icon={Heart} color="border-pink-200 bg-pink-50 text-pink-900"
          title="Emergency Contact"
          description="Ensure your emergency contact is set in your health profile so CarePath can assist."
          action={
            <Link to="/user/profile" className="inline-flex items-center gap-1 text-xs font-medium text-pink-700 mt-2 underline">
              Update profile →
            </Link>
          }
        />
      </div>
    </div>

    {/* First Aid guides */}
    <div>
      <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-emerald-600" /> Basic First Aid Guides
      </h2>
      <div className="space-y-4">
        {FIRST_AID.map((guide) => (
          <div key={guide.title} className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{guide.title}</h3>
            <ol className="space-y-1">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
      <strong className="flex items-center gap-1.5 mb-1"><Info className="w-3.5 h-3.5" /> Disclaimer</strong>
      This information is for general guidance only. Always call your local emergency services for life-threatening situations.
      First aid should be performed only by trained individuals where possible.
    </div>
  </div>
);

export default EmergencyPage;
