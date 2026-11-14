# NOVA Admin

E-commerce administration dashboard (React + Vite + TypeScript) on top of FakeStoreAPI.

## Status
Phases 1-4 (setup, core architecture, design system, authentication). Later phases are added after approval.

## Run
```
npm install
cp .env.example .env
npm run dev
```
Build check: `npm run build`.

## Authentication (Phase 4)
- Login calls `POST /auth/login` through the shared Axios instance (`Utils/services/authService.ts`).
  FakeStoreAPI returns only `{ token }`; there is no user profile, so the only user info kept is the
  username the person typed. Credentials are never hardcoded; see fakestoreapi.com for its demo accounts.
- `authSlice` holds `status` (unauthenticated / authenticating / authenticated), `token`, `username`, `error`.
  `isAuthenticated` / `isLoading` are derived selectors. Passwords are never put in state.
- Routes: `ProtectedRoute` redirects signed-out users to `/login` (remembering the requested page);
  `PublicRoute` sends signed-in users away from `/login`. Both are declared in `Routes/index.tsx`.
- **Token storage: in memory only (Redux).** Nothing auth-related is written to localStorage/sessionStorage.
  Consequence: a page refresh signs the user out. This is deliberate: FakeStoreAPI offers no HttpOnly cookie
  session, and persisting a bearer token in web storage would expose it to any XSS. Do not treat the mock
  token as real security; the API does not enforce it on its other endpoints.
- Redux DevTools / action payloads can transiently contain the submitted password (the thunk argument);
  it is not stored in state.

## FakeStoreAPI limitations
- POST requests do not persist; created products/users live only in the current session's Redux state.
- Newly created users cannot be assumed to authenticate.
- No real pagination; it is done client-side.

## Phase 6 — Visual refinement and products

The sidebar, dashboard summary cards, and product management UI were updated.
Products are fetched using the existing Axios instance, searched and paginated locally (7 per page), and created through Formik/Yup. Successful POST results are added to the current Redux list only; FakeStoreAPI does not persist them. Rating is shown when provided by the API, and a dash is shown for new products. The product form is a modal and does not introduce a new route.

**Verification note:** Dependencies could not be installed in the execution environment (offline npm cache lacked required packages). TypeScript build and interactive browser verification remain pending. Run `npm install && npm run build && npm run dev` on a network-enabled machine before approving the phase.
