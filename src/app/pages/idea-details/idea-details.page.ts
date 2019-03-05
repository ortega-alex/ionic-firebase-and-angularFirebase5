import { Component, OnInit } from '@angular/core';
import { Idea, IdeaService } from 'src/app/services/idea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  public idea : Idea = {
    name : '' ,
    notes : ''
  };

  constructor(
    private activatedRoute : ActivatedRoute,
    private ideaService : IdeaService,
    private toastController : ToastController,
    private router : Router
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id ) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      }, err => {
        console.log(err);
        this.showToas('the was a problem get your idea:');
      });
    }
  }

  public deleteIdea() : void {
    this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToas('Idea deleted');
    } , err => {
      console.log(err);
      this.showToas('the was a problem deleting your idea:');
    });
  }

  public updateIdea() : void {
    this.ideaService.updateIde(this.idea).then(() => {
      this.showToas('Idea updated!');
    }, err => {
      console.log(err);
      this.showToas('the was a problem updating your idea:');
    });
  }

  public addIdea() : void {
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/');
      this.showToas('Idea Added!');
    }, err => {
      console.log(err);
      this.showToas('the was a problem adding your idea:');
    });
  }

  private showToas(msj : string) : void {
    this.toastController.create({
      message : msj,
      duration: 2000
    }).then(toast => toast.present());
  }
}
