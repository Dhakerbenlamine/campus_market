import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce } from '../../models/annonce';
import { FormsModule } from '@angular/forms';
@Component({
selector: 'app-home',
standalone: true,
imports: [
CommonModule,
FormsModule,
RouterLink
],
templateUrl: './home.html',
styleUrl: './home.css',
})
export class Home implements OnInit {
annonces: Annonce[] = [];
annoncesFiltrees: Annonce[] = [];
recherche = '';
categorie = '';
constructor(private service: AnnonceService) {}
ngOnInit(): void {
this.chargerAnnonces();
}
// Charger toutes les annonces
chargerAnnonces(): void {
this.service.getAnnonces().subscribe({
next: (data) => {
this.annonces = data;
this.filtrerAnnonces();
},
error: (error) => {
console.error('Erreur de chargement', error);
}
});
}
// Filtrer les annonces
filtrerAnnonces(): void {
this.annoncesFiltrees = this.annonces.filter(a => {
const titreOK = a.titre.toLowerCase()
.includes(this.recherche.toLowerCase());
const categorieOK = this.categorie === ''
|| a.categorie === this.categorie;
return titreOK && categorieOK;
});
}
// Supprimer une annonce
supprimer(id: string): void {
if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
this.service.deleteAnnonce(id).subscribe({
next: () => {
this.chargerAnnonces();
alert('Annonce supprimée avec succès');
},
error: () => {
alert('Erreur lors de la suppression');
}
});
}
}
}
