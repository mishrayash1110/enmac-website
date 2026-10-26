-- PostgreSQL migration: manually apply in a restricted ENMAC database.
-- Do not expose credentials to the browser; limit SQL access to backend service identity.
CREATE TABLE IF NOT EXISTS leads (
    id uuid PRIMARY KEY,
    kind text NOT NULL CHECK(kind IN ('enquiry','application')),
    applicant_type text NOT NULL,
    contact_name text NOT NULL,
    contact_phone text NOT NULL,
    contact_email text NOT NULL,
    service_category text NOT NULL,
    amount_inr numeric(18,2),
    source_page text,
    consent_to_contact boolean NOT NULL,
    applicant_data jsonb NOT NULL,
    status text NOT NULL DEFAULT 'New',
    assigned_to uuid,
    next_followup_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_status_time_idx ON leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at);
-- Review encryption at rest, row access policy, retention/deletion schedule and DSR workflow with ENMAC legal team.
-- There is deliberately no unauthenticated GET endpoint for applicant records.
