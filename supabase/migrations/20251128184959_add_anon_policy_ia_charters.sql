/*
  # Ajouter politique RLS pour accès anonyme aux chartes IA

  1. Modifications
    - Ajout d'une politique SELECT pour les utilisateurs anonymes (anon role)
    - Permet la lecture publique des chartes IA sans authentification

  2. Sécurité
    - La politique reste restrictive : lecture seule pour les utilisateurs anonymes
    - Pas d'insertion, modification ou suppression possible
*/

-- Supprimer la politique si elle existe déjà
DROP POLICY IF EXISTS "IA charters are viewable by anonymous users" ON ia_charters;

-- Créer une politique pour permettre aux utilisateurs anonymes de lire les chartes
CREATE POLICY "IA charters are viewable by anonymous users"
  ON ia_charters
  FOR SELECT
  TO anon
  USING (true);
