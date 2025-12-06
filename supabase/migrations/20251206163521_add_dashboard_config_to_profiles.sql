/*
  # Add dashboard configuration to profiles

  1. Changes
    - Add `dashboard_config` column to `profiles` table
      - Type: JSONB (stores dashboard widget configuration)
      - Nullable: true (allows default NULL for existing users)
      - Default: NULL
  
  2. Purpose
    - Store personalized dashboard configuration per user
    - Includes widget types, order, status, progress, and metadata
    - Enables persistent, user-specific dashboard customization
  
  3. Notes
    - Existing profiles will have NULL dashboard_config initially
    - Frontend will initialize default dashboard on first access
    - JSONB type allows flexible storage and efficient queries
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'dashboard_config'
  ) THEN
    ALTER TABLE profiles ADD COLUMN dashboard_config JSONB DEFAULT NULL;
  END IF;
END $$;