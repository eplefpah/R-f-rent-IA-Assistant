/*
  # Add competency level to profiles table

  1. Changes
    - Add `competency_level` column to profiles table
      - Stores the AI competency level: 'Niveau 1 - Distant', 'Niveau 2 - Confirmé', 'Niveau 3 - Expert'
    - Add `competency_score` column to store the evaluation score (0-100)
    - Add `competency_evaluated_at` timestamp to track when evaluation was done

  2. Notes
    - Default value is null (not evaluated yet)
    - Allows users to retake the evaluation and update their level
*/

-- Add competency level columns to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'competency_level'
  ) THEN
    ALTER TABLE profiles ADD COLUMN competency_level text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'competency_score'
  ) THEN
    ALTER TABLE profiles ADD COLUMN competency_score integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'competency_evaluated_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN competency_evaluated_at timestamptz;
  END IF;
END $$;

-- Add check constraint to ensure valid competency levels
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_competency_level_check'
  ) THEN
    ALTER TABLE profiles
    ADD CONSTRAINT profiles_competency_level_check
    CHECK (competency_level IN ('Niveau 1 - Distant', 'Niveau 2 - Confirmé', 'Niveau 3 - Expert') OR competency_level IS NULL);
  END IF;
END $$;

-- Add check constraint to ensure score is between 0 and 100
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_competency_score_check'
  ) THEN
    ALTER TABLE profiles
    ADD CONSTRAINT profiles_competency_score_check
    CHECK (competency_score >= 0 AND competency_score <= 100 OR competency_score IS NULL);
  END IF;
END $$;
