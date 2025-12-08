/*
  # Add contact preference to profiles

  1. Changes
    - Add `allow_contact` column to `profiles` table
      - Type: boolean
      - Default: true (users are contactable by default)
      - Allows users to control visibility of their email on the platform
  
  2. Notes
    - Users can toggle this setting in their profile
    - When false, email will be hidden from other users in the directory
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'allow_contact'
  ) THEN
    ALTER TABLE profiles ADD COLUMN allow_contact boolean DEFAULT true;
  END IF;
END $$;