import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-shared-directory',
  templateUrl: './shared-directory.component.html',
  styleUrls: ['./shared-directory.component.scss']
})
export class SharedDirectoryComponent implements OnInit {

  directory:Directory = new Directory();

  constructor(private route: ActivatedRoute,private ds: DirectoryService) { }

  ngOnInit(): void {
    let directoryId = this.route.snapshot.paramMap.get("directoryId");
    this.ds.directoryPublic(directoryId).toPromise().then(r=>{
      this.directory = r;
    });
  }

}
