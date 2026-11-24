import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Annonce } from '../../models/annonce';
import { AnnonceService } from '../../services/annonce.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize, timeout } from 'rxjs';
@Component({
standalone: true,
selector: 'app-annonce-details',
imports: [CommonModule, RouterLink],
templateUrl: './annonce-details.html',
styleUrl: './annonce-details.css'
})
export class AnnonceDetails implements OnInit {
annonce?: Annonce;
loading = true;
errorMessage = '';
constructor(
private annonceService: AnnonceService,
private route: ActivatedRoute,
private cdr: ChangeDetectorRef
) {}
ngOnInit(): void {
const id = this.route.snapshot.paramMap.get('id');
if (!id) {
this.errorMessage = 'Identifiant de l’annonce manquant.';
this.loading = false;
return;
}
this.annonceService.getAnnonceById(id)
.pipe(
timeout({ first: 10000 }),
finalize(() => {
this.loading = false;
this.cdr.detectChanges();
})
)
.subscribe({
next: (data) => {
console.log('Annonce récupérée :', data);
this.annonce = data;
this.cdr.detectChanges();
},
error: (error) => {
console.error('Erreur :', error);
this.errorMessage =
'Cette annonce est introuvable ou n’est plus disponible.';
this.cdr.detectChanges();
}
});
}
imageErreur(event: Event): void {
(event.target as HTMLImageElement).src =
'https://placehold.co/800x600/eef2ff/334155?text=CampusMarket';
}
}
