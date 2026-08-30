/**
 * userService — CarePath AI
 * API calls for the USER role endpoints.
 */

import api from './api';

/** Fetch the authenticated user's full profile */
export const fetchProfile = () =>
  api.get('/user/profile').then((r) => r.data);

/** Update basic profile fields (name, phone, gender, dob, language, location) */
export const updateProfile = (data) =>
  api.put('/user/profile', data).then((r) => r.data);

/** Update the health profile snapshot (blood type, allergies, etc.) */
export const updateHealthProfile = (data) =>
  api.put('/user/health-profile', data).then((r) => r.data);

/** Update consent preferences */
export const updateConsent = (data) =>
  api.put('/user/consent', data).then((r) => r.data);

// ── Appointments ──────────────────────────────────────────────────────────────
export const fetchAppointments = (params = {}) =>
  api.get('/user/appointments', { params }).then((r) => r.data);

export const bookAppointment = (data) =>
  api.post('/user/appointments', data).then((r) => r.data);

export const fetchAppointment = (id) =>
  api.get(`/user/appointments/${id}`).then((r) => r.data);

export const cancelAppointment = (id, reason) =>
  api.put(`/user/appointments/${id}/cancel`, { reason }).then((r) => r.data);

// ── Notifications ─────────────────────────────────────────────────────────────
export const fetchNotifications = (params = {}) =>
  api.get('/user/notifications', { params }).then((r) => r.data);

export const fetchUnreadCount = () =>
  api.get('/user/notifications/count').then((r) => r.data);

export const markNotificationRead = (id) =>
  api.put(`/user/notifications/${id}/read`).then((r) => r.data);

export const markAllNotificationsRead = () =>
  api.put('/user/notifications/read-all').then((r) => r.data);

// ── Health Records (History) ──────────────────────────────────────────────────
export const fetchHealthRecords = (params = {}) =>
  api.get('/user/history', { params }).then((r) => r.data);

export const createHealthRecord = (data) =>
  api.post('/user/history', data).then((r) => r.data);

export const fetchHealthRecord = (id) =>
  api.get(`/user/history/${id}`).then((r) => r.data);

export const updateHealthRecord = (id, data) =>
  api.put(`/user/history/${id}`, data).then((r) => r.data);

export const deleteHealthRecord = (id) =>
  api.delete(`/user/history/${id}`).then((r) => r.data);

// ── Search (public) ───────────────────────────────────────────────────────────
export const searchHospitals = (params = {}) =>
  api.get('/search/hospitals', { params }).then((r) => r.data);

export const fetchHospitalById = (id) =>
  api.get(`/search/hospitals/${id}`).then((r) => r.data);

export const searchProfessionals = (params = {}) =>
  api.get('/search/professionals', { params }).then((r) => r.data);

export const fetchProfessionalById = (id) =>
  api.get(`/search/professionals/${id}`).then((r) => r.data);
