# Nano loan description - Update Prédiction du crédit

<p>
Le fichier suivant fait office de bref guide technique pour la prédiction par le modèle de la phase test du montant alloué à un client pour sa demande de crédit
<ol>
Le dossier contient 2 fichiers: 
<li> "nano_loan.h5" représentant le modèle test pour la prédiction du montant </li>
<li>"standardize_input.sav", "standardize_output.sav" qui représentent les outils pour normaliser les données d'entrées et de sortie pour la prédiction</li>
<li> Les vecteur d'entrées pour la prédiction: ['frequence', 'recence', 'nbre_cpte_actif', 'age', 'anciennete',
       'sexe_0.0', 'sexe_1.0', 'sms_0.0', 'sms_1.0', 'efirst_0.0',
       'efirst_1.0', 'mac_0.0', 'mac_1.0', 'carte_0.0', 'carte_1.0',
       'statut_mat_0.0', 'statut_mat_1.0', 'statut_mat_2.0']  </li>
<li> Les values de 	se font suivant le one hot encoding ex: efirst_0.0 = 0 et efirst_1.0 = 1 (le client possède le efirst) </>
<li> Une fois le vecteur prêt , le normaliser avec "standardize_input" ensuite prédire avec model.predict, une fois la prédiction obtenue, dénormaliser avec "standard_output"</li>
</ol>
</p>
