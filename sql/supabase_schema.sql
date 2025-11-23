-- Players
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Leaderboards
CREATE TABLE IF NOT EXISTS leaderboards (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text
);

-- Player ratings per leaderboard
CREATE TABLE IF NOT EXISTS player_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  leaderboard_id text REFERENCES leaderboards(id) ON DELETE CASCADE,
  elo integer DEFAULT 1000,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  games_played integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(player_id, leaderboard_id)
);

-- Match results
CREATE TABLE IF NOT EXISTS match_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player1 uuid REFERENCES players(id),
  player2 uuid REFERENCES players(id),
  winner uuid REFERENCES players(id),
  leaderboard_id text REFERENCES leaderboards(id),
  played_at timestamptz DEFAULT now()
);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  description text,
  image_url text
);

CREATE TABLE IF NOT EXISTS player_badges (
  player_id uuid REFERENCES players(id),
  badge_id uuid REFERENCES badges(id),
  awarded_at timestamptz DEFAULT now(),
  PRIMARY KEY(player_id, badge_id)
);

-- Seed leaderboards if not exist
INSERT INTO leaderboards (id, name, description)
VALUES
('classic', 'Classic ELO', 'Classic leaderboard'),
('da', 'DA ELO', 'DA leaderboard'),
('arrows', 'Arrows ELO', 'Arrows leaderboard'),
('grapple', 'Grapple ELO', 'Grapple leaderboard'),
('vtol', 'VTOL', 'VTOL leaderboard'),
('footy', 'Footy', 'Footy leaderboard'),
('wdb', 'WDB', 'WDB leaderboard'),
('flats', 'Flats', 'Flats leaderboard'),
('parkour', 'Parkour', 'Parkour leaderboard'),
('exp', 'EXP Leaderboard', 'EXP leaderboard')
ON CONFLICT (id) DO NOTHING;
