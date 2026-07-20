/**
 * Database Schema — Supabase (PostgreSQL)
 *
 * Run this SQL in Supabase SQL Editor to set up tables.
 * Or use Prisma/Drizzle migrations.
 *
 * Setup:
 * 1. Create Supabase project at supabase.com
 * 2. Copy this SQL to SQL Editor → Run
 * 3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env
 */

export const SCHEMA_SQL = `
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Users table (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Listings table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  category TEXT,
  key_features TEXT[],
  target_audience TEXT,
  keywords TEXT[],
  platform TEXT NOT NULL CHECK (platform IN ('amazon', 'shopify', 'etsy', 'ebay')),
  language TEXT DEFAULT 'en',
  tone TEXT DEFAULT 'professional' CHECK (tone IN ('professional', 'casual', 'luxury', 'technical')),

  -- Generated content
  title TEXT,
  bullet_points TEXT[],
  description TEXT,
  search_terms TEXT[],
  quality_score INTEGER,
  suggestions TEXT[],

  -- Metadata
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_user_id ON public.listings(user_id);
CREATE INDEX idx_listings_platform ON public.listings(platform);
CREATE INDEX idx_listings_created_at ON public.listings(created_at);

-- ============================================================
-- Subscriptions table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('pro', 'business')),
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'cancelled', 'expired', 'trialing')),
  provider TEXT NOT NULL CHECK (provider IN ('paypal', 'creem', 'manual')),
  provider_subscription_id TEXT,
  provider_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

-- ============================================================
-- Usage tracking (for rate limiting free tier)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  feature TEXT NOT NULL DEFAULT 'listing_generation',
  count INTEGER DEFAULT 0,
  period_start DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, feature, period_start)
);

CREATE INDEX idx_usage_user_id ON public.usage(user_id);

-- ============================================================
-- Payment events (audit log)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payment_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  provider TEXT NOT NULL,
  event_type TEXT NOT NULL,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  raw_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/write their own
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Listings: users can CRUD their own
CREATE POLICY "Users can read own listings"
  ON public.listings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON public.listings FOR DELETE
  USING (auth.uid() = user_id);

-- Subscriptions: users can read own
CREATE POLICY "Users can read own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Usage: users can read own
CREATE POLICY "Users can read own usage"
  ON public.usage FOR SELECT
  USING (auth.uid() = user_id);

COMMENT ON TABLE public.profiles IS 'Extended user profiles, linked to auth.users';
COMMENT ON TABLE public.listings IS 'User-generated product listings with AI output';
COMMENT ON TABLE public.subscriptions IS 'Subscription records from PayPal/Creem';
COMMENT ON TABLE public.usage IS 'Usage tracking for rate limiting';
COMMENT ON TABLE public.payment_events IS 'Audit log of all payment-related events';
`;
