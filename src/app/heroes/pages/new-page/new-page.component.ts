import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {

    if(!this.router.url.includes('edit'))return

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe(hero => {
      if ( !hero ) return this.router.navigateByUrl('/');

      this.heroForm.reset( hero );
      return;
    })

  }

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc:'DC - Comics'},
    {id: 'Marvel Comics', desc:'Marvel - Comics'}
  ]

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero
  }

  onSubmit(): void {

    if( this.heroForm.invalid )return;

    if(this,this.currentHero.id) {
      this.heroesService.updateHero( this.currentHero )
      .subscribe(hero => {
        //TODO: mostrar snackbar
      })
      return;
    }

    this.heroesService.addHero( this.currentHero )
    .subscribe( hero => {
      //TODO: mostrar snack y navegar a /heroes/edit/ hero.id
    } )

  }
}
