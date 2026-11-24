import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AnnonceForm } from './components/annonce-form/annonce-form';
import { AnnonceDetails } from './components/annonce-details/annonce-details';
export const routes: Routes = [
{ path: '', component: Home },
{ path: 'ajouter', component: AnnonceForm },
{ path: 'modifier/:id', component: AnnonceForm },
{ path: 'annonce/:id', component: AnnonceDetails },
{ path: '**', redirectTo: '' }
];
