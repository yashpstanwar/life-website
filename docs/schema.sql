-- ---------------------------------------------------------------------------
-- LIFE (I.I.D.C.) — donation and enquiry schema
--
-- NOT REQUIRED FOR LAUNCH. The site works without any database: every donation
-- is recorded in Razorpay with the donor's details stored in the order `notes`,
-- and the Razorpay dashboard exports to CSV.
--
-- Add this when you outgrow that — typically when you want to generate 80G
-- receipts automatically or file Form 10BD without hand-assembling a sheet.
-- Written for Postgres (Supabase and Neon both have free tiers).
-- ---------------------------------------------------------------------------

create table if not exists donations (
  id                bigserial primary key,

  -- Receipt numbering must be unique and traceable for income tax audit.
  receipt_number    text unique not null,

  -- Razorpay identifiers
  razorpay_order_id        text,
  razorpay_payment_id      text unique,
  razorpay_subscription_id text,

  -- Money, stored in paise to avoid floating point drift.
  amount_paise      bigint not null check (amount_paise > 0),
  currency          text not null default 'INR',
  fees_covered      boolean not null default false,

  -- Donor. PAN is mandatory above ₹2,000 for the donor to claim 80G, and
  -- mandatory for us to report them in Form 10BD.
  donor_name        text not null,
  donor_email       text not null,
  donor_mobile      text not null,
  donor_pan         text,
  donor_address     text,
  donor_city        text,
  donor_state       text,
  donor_pincode     text,

  -- Statutory flags
  is_anonymous      boolean not null default false,
  consent_updates   boolean not null default false,
  citizen_declared  boolean not null default true,

  -- Programme designation
  programme         text not null,
  frequency         text not null default 'one-time'
                      check (frequency in ('one-time', 'monthly')),

  -- Lifecycle. `captured` is the only status that counts as received.
  status            text not null default 'created'
                      check (status in ('created','authorized','captured','failed','refunded')),
  payment_method    text,
  failure_reason    text,

  -- 80G / Form 10BD tracking
  receipt_issued_at   timestamptz,
  reported_10bd_fy    text,          -- e.g. '2026-27'
  certificate_10be_at timestamptz,

  created_at        timestamptz not null default now(),
  captured_at       timestamptz,
  updated_at        timestamptz not null default now()
);

create index if not exists donations_created_idx  on donations (created_at desc);
create index if not exists donations_status_idx   on donations (status);
create index if not exists donations_pan_idx      on donations (donor_pan) where donor_pan is not null;
create index if not exists donations_fy_idx       on donations (reported_10bd_fy);

-- Financial-year view: this is the shape Form 10BD wants, so filing becomes
-- an export rather than a reconstruction.
create or replace view donations_10bd as
select
  donor_pan                      as "PAN",
  max(donor_name)                as "Name of donor",
  max(donor_address)             as "Address",
  'Individual'                   as "ID type",
  sum(amount_paise) / 100.0      as "Amount",
  'Others'                       as "Donation type",
  'Yes'                          as "Section 80G"
from donations
where status = 'captured'
  and donor_pan is not null
  and captured_at >= date '2026-04-01'
  and captured_at <  date '2027-04-01'
group by donor_pan;

-- Webhook idempotency. Razorpay retries; without this a retried
-- payment.captured could double-count a donation.
create table if not exists webhook_events (
  id           bigserial primary key,
  event_id     text unique not null,
  event_type   text not null,
  payload      jsonb not null,
  processed_at timestamptz not null default now()
);

-- Volunteer / intern / partner applications and general enquiries.
create table if not exists enquiries (
  id           bigserial primary key,
  kind         text not null check (kind in ('volunteer','intern','partner','training','contact','pledge')),
  name         text not null,
  email        text not null,
  phone        text,
  organisation text,
  role         text,
  course       text,
  message      text,
  handled      boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists enquiries_kind_idx on enquiries (kind, created_at desc);

-- Blood / eye donation pledges are personal health information. If you store
-- these, restrict access tightly and state the retention period in the
-- privacy policy.
