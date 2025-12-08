/*
  # Add tooltips preference to profiles table

  1. Changes
    - Add `tooltips_enabled` column to `profiles` table
      - Type: boolean
      - Default: true (tooltips enabled by default)
      - Description: Controls whether navigation tooltips are shown to the user
  
  2. Security
    - No changes to RLS policies needed (existing policies cover this column)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'tooltips_enabled'
  ) THEN
    ALTER TABLE profiles ADD COLUMN tooltips_enabled boolean DEFAULT true;
  END IF;
END $$;