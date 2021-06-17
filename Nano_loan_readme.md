# Nano loan description

<p>
Le fichier suivant fait office de bref descriptif et de guide dans le cadre du projet Nano loan
concernant le pan de la modélisation du modèle prédictif d'éligibilité. <br>
Ainsi, il est subdividé en deux parties:
<ol>
<li>Guide d'utilisation du modèle en phase de test</li>
<li>Listing des variables à utiliser en post production</li>
</ol>
</p>

<ol>
<h4><li>Modèle construit et guide</li> </h4>
<p>
    Le modèle a été construit à la suite de l'étude préalablable portant
    sur l'éligibilité des clients dans le cadre de l'otroie des nano crédit.
    Hors mis les autres variables indépendantes, le modèle se base principalement sur la récence, la fréquence et le montant (RFM).
    Un algorithme de clustering a été construit dans le but de séparer les données en 3 groupes ( groupe 1, 2 et 3).
    La construction de la variable cible <i>statut</i> a été fait en affectant la classe 1 au individus appartenant au groupe (groupe 3 dans ce cas) ayant
    les plus grandes valeurs en RFM et la classe 0 pour les autres groupes (groupes 1 et 2). Les classes 1 et 0 désignent resp. non éligible et éligible. 
    Compte tenu de la cible du produit fini et de la base de données des clients et des transactions dont nous disposons, les clients retenus pour cette phase test sont ceux dont les montant moyens varient entre 10 000 et 5 000 000.
</p>

<p>
    L'utilisation du modèle en test est relativement simple, elle suit les étapes suivantes :
    <ol>
    <li>Le chargement du modèle à l'aide de la fonction load_model de keras</li>
    <li>La constitution des variables d'entrée sous forme numérique: 'frequence', 'recence', 'Montant', 'sexe', 'nbre_cpte_actif', 'sms','efirst', 'age', 'anciennete', 'mac', 'carte', 'statut_mat' </li>
    <li> Présenter les variables d'entrée sous forme de vecteur à 3 dimensions (vous pouvez utiliser la fonction expand_dims de numpy)</li>
    <li>Passer le vecteur au modèle chargé et obtenir la prédiction (0 pour non éligible et 1 pour éligible) </li>
    </ol>
</p>

<h4><li>Variables pour la construction du nouveau modèle en post production </h4>
<p>Une fois le modèle mis en production et utilisé sur la plateforme par les clients les nouvelles variables qui seront utilisées pour la construction du nouveau modèle 
sont les suivantes (De manière provisoire): 
<ul>
<li> Le délai maximal de remboursement d'un client </li>
<li> Les valeurs moyenne de son comportement ( comportement => vert rouge ou jaune) </li>
</ul>
</p>

</ol>

<p>
<i>NB: Un document plus détaillé sera fourni vendredi le 24 Juin, accompagné d'une version finale du modèle pour la production. Le fichier suivant ne fait office que de bref descriptif. Le modèle provisoire nano_loan.h5 est en pièce jointe</i>
</p>