import { CommonModule } from '@angular/common';
import {
Component,
OnInit,
ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
ActivatedRoute,
Router,
RouterLink
} from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce, CATEGORIES } from '../../models/annonce';
@Component({
standalone: true,
selector: 'app-annonce-form',
imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './annonce-form.html',
styleUrl: './annonce-form.css'
})
export class AnnonceForm implements OnInit {
// Identifiant de l'annonce en mode modification
id: string | null = null;
// États du formulaire
loading = false;
submitting = false;
// Indique si l'utilisateur a essayé de soumettre le formulaire
submitted = false;
// Liste des catégories
readonly categories = CATEGORIES;
// Objet annonce initialisé avec des valeurs vides
annonce: Annonce = this.initialiserAnnonce();
constructor(
private annonceService: AnnonceService,
private route: ActivatedRoute,
private router: Router,
private cdr: ChangeDetectorRef
) {}
// =========================================
// INITIALISATION D'UNE ANNONCE VIDE
// =========================================
initialiserAnnonce(): Annonce {
return {
titre: '',
description: '',
prix: 0,
categorie: '',
etat: 'Occasion',
vendeur: '',
telephone: '',
image: ''
};
}
// =========================================
// INITIALISATION DU COMPOSANT
// =========================================
ngOnInit(): void {
// Récupérer l'identifiant depuis l'URL
this.id = this.route.snapshot.paramMap.get('id');
console.log('ID de modification :', this.id);
// =====================================
// MODE MODIFICATION
// =====================================
if (this.id) {
this.loading = true;
this.annonceService.getAnnonceById(this.id)
.pipe(
timeout({ first: 10000 }),
finalize(() => {
this.loading = false;
this.cdr.detectChanges();
console.log('Fin du chargement du formulaire');
})
)
.subscribe({
next: (data) => {
console.log('Annonce récupérée :', data);
// Préremplir le formulaire
this.annonce = {
...data
};
this.cdr.detectChanges();
},
error: (error) => {
console.error('Erreur de récupération :', error);
if (error.name === 'TimeoutError') {
alert('Le serveur met trop de temps à répondre.');
} else {
alert('Annonce introuvable.');
}
this.router.navigate(['/']);
}
});
}
// =====================================
// MODE AJOUT
// =====================================
else {
// Initialiser un formulaire vide
this.annonce = this.initialiserAnnonce();
this.loading = false;
this.cdr.detectChanges();
console.log('Mode ajout : formulaire prêt');
}
}
// =========================================
// ENREGISTREMENT / MODIFICATION
// =========================================
enregistrer(formIsValid: boolean): void {
console.log('========== ENREGISTREMENT ==========');
console.log('Mode :', this.id ? 'Modification' : 'Ajout');
console.log('Formulaire valide :', formIsValid);
console.log('Données :', this.annonce);
// Afficher les messages d'erreur après la soumission
this.submitted = true;
// Vérifier la validité du formulaire
if (!formIsValid) {
console.log('Formulaire invalide : enregistrement annulé.');
return;
}
// Empêcher les doubles soumissions
if (this.submitting) {
return;
}
this.submitting = true;
// Sélectionner l'opération selon le mode
const operation = this.id
? this.annonceService.updateAnnonce(this.id, this.annonce)
: this.annonceService.addAnnonce(this.annonce);
operation
.pipe(
finalize(() => {
this.submitting = false;
this.cdr.detectChanges();
})
)
.subscribe({
// =====================================
// SUCCÈS
// =====================================
next: (response) => {
console.log('Annonce enregistrée avec succès :', response);
alert(
this.id
? 'Annonce modifiée avec succès !'
: 'Annonce publiée avec succès !'
);
this.router.navigate(['/']);
},
// =====================================
// ERREUR
// =====================================
error: (error) => {
console.error('Erreur HTTP :', error);
alert(
error?.error?.message ||
'Erreur lors de l’enregistrement. Vérifiez les informations et le serveur.'
);
}
});
}
}

