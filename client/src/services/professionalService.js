/**
 * professionalService — CarePath AI
 * API calls for the PROFESSIONAL role endpoints.
 */

import api from './api';

// ── Profile ────────────────────────────────────────────────────────────────────
export const fetchProfessionalProfile = () =>
  api.get('/professional/profile').then((r) => r.data);

export const upsertProfessionalProfile = (data) =>
  api.put('/professional/profile', data).then((r) => r.data);

// ── Associations ───────────────────────────────────────────────────────────────
export const fetchAssociations = () =>
  api.get('/professional/associations').then((r) => r.data);

export const requestHospitalAssociation = (hospitalId, department, role) =>
  api.post('/professional/associations/request', { hospitalId, department, role }).then((r) => r.data);

// ── Notifications ──────────────────────────────────────────────────────────────
export const fetchProfessionalNotifications = (params = {}) =>
  api.get('/professional/notifications', { params }).then((r) => r.data);

export const markProfessionalNotificationRead = (id) =>
  api.put(`/professional/notifications/${id}/read`).then((r) => r.data);

export const markAllProfessionalNotificationsRead = () =>
  api.put('/professional/notifications/read-all').then((r) => r.data);

// ── Appointments ───────────────────────────────────────────────────────────────
export const fetchProfessionalAppointments = (params = {}) =>
  api.get('/professional/appointments', { params }).then((r) => r.data);

// ── Availability ───────────────────────────────────────────────────────────────
export const updateAvailability = (availability) =>
  api.put('/professional/availability', { availability }).then((r) => r.data);

// ── Requests ───────────────────────────────────────────────────────────────────
export const fetchProfessionalRequests = (params = {}) =>
  api.get('/professional/requests', { params }).then((r) => r.data);

export const sendProfessionalRequest = (data) =>
  api.post('/professional/requests', data).then((r) => r.data);
