/*
  # Create favorite metrics table

  1. New Tables
    - `favorite_metrics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `metric_id` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `favorite_metrics` table
    - Add policies for authenticated users to manage their favorites
*/

CREATE TABLE IF NOT EXISTS favorite_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  metric_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, metric_id)
);

ALTER TABLE favorite_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
  ON favorite_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON favorite_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorite_metrics
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);