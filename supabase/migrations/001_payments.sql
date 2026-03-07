-- Migration: Add tier to users + create payments table
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free' NOT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier_updated_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  wallet_address TEXT NOT NULL,
  tier TEXT NOT NULL,
  amount_usd NUMERIC NOT NULL,
  chain_id INTEGER NOT NULL,
  tx_hash TEXT UNIQUE NOT NULL,
  token TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  confirmed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payments_wallet ON payments(wallet_address);
CREATE INDEX IF NOT EXISTS idx_payments_tx_hash ON payments(tx_hash);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
