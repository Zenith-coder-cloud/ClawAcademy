-- Migration: CryptoBot payments + wallet linking for Telegram users

-- Add cryptobot_invoice_id to payments table
ALTER TABLE payments ADD COLUMN IF NOT EXISTS cryptobot_invoice_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'crypto';

-- Allow payments by telegram_id (nullable wallet_address)
ALTER TABLE payments ALTER COLUMN wallet_address DROP NOT NULL;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS telegram_id BIGINT;

-- Make tx_hash nullable (CryptoBot payments don't have on-chain tx_hash initially)
ALTER TABLE payments ALTER COLUMN tx_hash DROP NOT NULL;

-- Wallet linking: allow TG user to link wallet later
ALTER TABLE users ADD COLUMN IF NOT EXISTS wallet_linked_at TIMESTAMPTZ;
