# Unused API Endpoints

After cross-referencing the `Vehicles.postman_collection.json` with the React front-end source code (`src/` directory), we identified several API endpoints that are currently documented in Postman but **not used** in the frontend codebase.

## Summary
There are **9** endpoints from the Auth and Users sections that do not appear to have corresponding front-end service calls.

### Authentication & Password Management
These endpoints imply that email verification and password reset flows are defined in the backend API but are not yet implemented in the React application.

| Name | Method | Path |
|------|--------|------|
| **Resend Verification** | `POST` | `/resend-verification` |
| **Verify Email** | `POST` | `/verify-email` |
| **Refresh Token** | `POST` | `/auth/refresh-token` |
| **Forgot Password** | `POST` | `/forgot-password` |
| **Verify Reset Code** | `POST` | `/verify-reset-code` |
| **Reset Password** | `POST` | `/reset-password` |

### User Management
These endpoints suggest the existence of a User Management dashboard or admin features (activating/disabling users and listing them) which are currently absent in the client code.

| Name | Method | Path |
|------|--------|------|
| **List Users** | `GET` | `/users` |
| **Activate User** | `PATCH` | `/users/:user/activate` |
| **Disable User** | `PATCH` | `/users/:user/disable` |

---
*Note: Endpoints like `/login`, `/register`, `/logout`, and standard CRUD operations for `vehicles` and `categories` and `favorites` etc. were confirmed to be in use.*
