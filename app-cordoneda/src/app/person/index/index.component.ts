import { Component, OnInit } from '@angular/core';

import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  persons: Person[] = [];
 
  constructor(public personService: PersonService) { }

//trae todos los datos al iniciar
  ngOnInit(): void {
    this.personService.getAll().subscribe((data: Person[])=>{
      this.persons = data;
      console.log(this.persons);
    })
  }

  //elimina al hacer click
  deletePerson(id){
    this.personService.delete(id).subscribe(res => {
         this.persons = this.persons.filter(item => item.id !== id);
         console.log('Person deleted successfully!');
    })
  }

}
