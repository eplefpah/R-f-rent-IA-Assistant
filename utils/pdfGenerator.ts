
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { RecueilData } from "../types";

export const generateRecueilPDF = (data: RecueilData) => {
  const doc = new jsPDF();
  
  // Couleurs de la charte
  const blueColor = "#6B9BD2";
  const darkColor = "#1e293b";

  // En-tête
  doc.setFillColor(blueColor);
  doc.rect(0, 0, 210, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("FICHE DE RECUEIL - BESOIN IA", 105, 13, { align: "center" });

  // Titre du projet
  doc.setTextColor(darkColor);
  doc.setFontSize(14);
  doc.text(`Titre : ${data.titre}`, 14, 35);
  doc.setFontSize(10);
  doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 14, 42);

  // Tableau des données
  const tableBody = [
    ["Contexte Métier", data.contexte],
    ["Description du Problème (Irritants)", data.irritants],
    ["Fréquence", data.frequence],
    ["Impact Métier", data.impact],
    ["Délai Souhaité", data.delai],
    ["Données Disponibles", data.donnees],
    ["Fichiers / Exemples", data.fichiers],
    ["Contraintes (RGPD, Sécurité)", data.contraintes],
    ["Solutions Actuelles / Tentatives", data.solutions_actuelles]
  ];

  autoTable(doc, {
    startY: 50,
    head: [["Rubrique", "Détail"]],
    body: tableBody,
    theme: "grid",
    headStyles: { fillColor: blueColor, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 10, cellPadding: 5, overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: "bold", textColor: darkColor },
      1: { cellWidth: "auto" }
    }
  });

  // Pied de page
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Document généré par l'Assistant Référent IA - Administration Publique", 105, pageHeight - 10, { align: "center" });

  // Sauvegarde
  doc.save(`Recueil_Besoin_${data.titre.replace(/\s+/g, "_")}.pdf`);
};
