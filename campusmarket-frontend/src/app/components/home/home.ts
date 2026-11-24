import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Annonce } from '../../models/annonce';
import { AnnonceService } from '../../services/annonce.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

  chargerAnnonces(): void {
    this.service.getAnnonces().subscribe({
      next: (data) => {
        this.annonces = data;
        this.filtrerAnnonces();
      },
      error: (error) => {
        console.error('Erreur de chargement', error);
      },
    });
  }

  filtrerAnnonces(): void {
    this.annoncesFiltrees = this.annonces.filter((a) => {
      const titreOK = a.titre
        .toLowerCase()
        .includes(this.recherche.toLowerCase());
      const categorieOK =
        this.categorie === '' || a.categorie === this.categorie;
      return titreOK && categorieOK;
    });
  }

  supprimer(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      this.service.deleteAnnonce(id).subscribe({
        next: () => {
          this.chargerAnnonces();
          alert('Annonce supprimée avec succès');
        },
        error: () => {
          alert('Erreur lors de la suppression');
        },
      });
    }
  }
}
