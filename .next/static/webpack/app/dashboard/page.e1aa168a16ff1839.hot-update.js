"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/app/dashboard/actions.ts":
/*!**************************************!*\
  !*** ./src/app/dashboard/actions.ts ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBarber: function() { return /* binding */ createBarber; },
/* harmony export */   createBarbershop: function() { return /* binding */ createBarbershop; },
/* harmony export */   createService: function() { return /* binding */ createService; },
/* harmony export */   createTimeBlock: function() { return /* binding */ createTimeBlock; },
/* harmony export */   deleteAppointments: function() { return /* binding */ deleteAppointments; },
/* harmony export */   deleteBarber: function() { return /* binding */ deleteBarber; },
/* harmony export */   deleteService: function() { return /* binding */ deleteService; },
/* harmony export */   deleteTimeBlock: function() { return /* binding */ deleteTimeBlock; },
/* harmony export */   signOutAction: function() { return /* binding */ signOutAction; },
/* harmony export */   updateAppointmentStatus: function() { return /* binding */ updateAppointmentStatus; },
/* harmony export */   updateBarber: function() { return /* binding */ updateBarber; },
/* harmony export */   updateBarbershopSettings: function() { return /* binding */ updateBarbershopSettings; },
/* harmony export */   updateService: function() { return /* binding */ updateService; },
/* harmony export */   upsertOperatingHours: function() { return /* binding */ upsertOperatingHours; }
/* harmony export */ });
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/client/app-call-server */ "(app-pages-browser)/./node_modules/next/dist/client/app-call-server.js");
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-client-wrapper */ "(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js");



function __build_action__(action, args) {
  return (0,next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__.callServer)(action.$$id, args)
}

/* __next_internal_action_entry_do_not_use__ {"02219cec3e95b385d491781a3f8b83486b3ffe5f":"updateBarbershopSettings","0242cef977a3fac7d67d49bb8d3698b9167ffd36":"createTimeBlock","29e2590812674a6d0c4154d3cf3ea8211ba6287c":"signOutAction","3cc7fb8fd2f31de5e0d13dc9706d2d9a4b25d003":"updateAppointmentStatus","41ae460b7635f7e3ff6772faef6963edb1ee33c7":"deleteBarber","5569ad15235b9005d1d56596c5c8a2f2171657aa":"deleteTimeBlock","563de55022346732ad7da373e0eb2c1b736953a2":"updateService","603a8cd022d56c4271f6d093e92ff6be7b59ed17":"updateBarber","7150beed8ea0569fe3f4ea8e84cab38286e121f6":"deleteAppointments","75f9a2a5ff297c8cf69ba0d69631cda5d82a4c67":"createBarbershop","77380c5b428cd4e25bf86bf7f8c1592ca8a0affe":"deleteService","9796e4422f06e85da485f821ec537cbc56f43556":"upsertOperatingHours","b47f706dfcbd674d12cb873183c609a9f08a02c8":"createService","f718191275af80aefc09e655635f5781fe057abd":"createBarber"} */ var updateBarbershopSettings = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("02219cec3e95b385d491781a3f8b83486b3ffe5f");

var createBarbershop = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("75f9a2a5ff297c8cf69ba0d69631cda5d82a4c67");
var signOutAction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("29e2590812674a6d0c4154d3cf3ea8211ba6287c");
var createBarber = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("f718191275af80aefc09e655635f5781fe057abd");
var createService = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("b47f706dfcbd674d12cb873183c609a9f08a02c8");
var updateService = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("563de55022346732ad7da373e0eb2c1b736953a2");
var deleteService = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("77380c5b428cd4e25bf86bf7f8c1592ca8a0affe");
var updateBarber = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("603a8cd022d56c4271f6d093e92ff6be7b59ed17");
var deleteBarber = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("41ae460b7635f7e3ff6772faef6963edb1ee33c7");
var updateAppointmentStatus = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("3cc7fb8fd2f31de5e0d13dc9706d2d9a4b25d003");
var upsertOperatingHours = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("9796e4422f06e85da485f821ec537cbc56f43556");
var createTimeBlock = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("0242cef977a3fac7d67d49bb8d3698b9167ffd36");
var deleteTimeBlock = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("5569ad15235b9005d1d56596c5c8a2f2171657aa");
var deleteAppointments = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("7150beed8ea0569fe3f4ea8e84cab38286e121f6");



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});