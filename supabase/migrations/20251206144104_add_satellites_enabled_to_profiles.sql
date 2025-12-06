/*
  # Add satellites animation preference to profiles

  1. Changes
    - Add `satellites_enabled` column to `profiles` table
      - Type: boolean
      - Default: false (satellites disabled by default)
      - Description: Controls whether animated satellites are displayed in dark mode
  
  2. Notes
    - This preference allows users to enable/disable satellite animations in dark mode
    - Default is false to improve performance and reduce visual distractions
    - User can opt-in via their profile settings
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'satellites_enabled'
  ) THEN
    ALTER TABLE profiles ADD COLUMN satellites_enabled boolean DEFAULT false;
  END IF;
END $$;