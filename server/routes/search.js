/**
 * Search routes — CarePath AI
 *
 * Mixed access: some routes require auth (USER), hospital/professional details are public.
 *
 * GET /api/search/hospitals           — search verified hospitals (public)
 * GET /api/search/hospitals/:id       — single hospital (public)
 * GET /api/search/professionals       — search verified professionals (public)
 * GET /api/search/professionals/:id   — single professional (public)
 */

'use strict';

const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/hospitals',           searchController.searchHospitals);
router.get('/hospitals/:id',       searchController.getHospital);
router.get('/professionals',       searchController.searchProfessionals);
router.get('/professionals/:id',   searchController.getProfessional);
router.get('/experts',             searchController.searchExperts);
router.get('/experts/:id',         searchController.getExpert);

module.exports = router;
