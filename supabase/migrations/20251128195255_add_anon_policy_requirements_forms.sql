/*
  # Ajouter politique RLS pour accès anonyme aux formulaires de besoins

  1. Modifications
    - Ajout d'une politique SELECT pour les utilisateurs anonymes (anon role)
    - Permet la lecture publique des formulaires de besoins sans authentification

  2. Sécurité
    - La politique reste restrictive : lecture seule pour les utilisateurs anonymes
    - Pas d'insertion, modification ou suppression possible
*/

DROP POLICY IF EXISTS "Requirements forms are viewable by anonymous users" ON requirements_forms;

CREATE POLICY "Requirements forms are viewable by anonymous users"
  ON requirements_forms
  FOR SELECT
  TO anon
  USING (true);
