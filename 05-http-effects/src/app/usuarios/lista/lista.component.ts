import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(public usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUser().subscribe((users) => {
      this.usuarios = users;
    });
  }
}
