import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Members } from 'src/app/_models/members';
import { Messages } from 'src/app/_models/messages';
import { MembersService } from 'src/app/_services/members.service';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: Members = {} as Members;
  imageGallary: GalleryItem[] = [];
  messages: Messages[] = [];
  @ViewChild('myMessageTab') myMessageTab = {} as MatTabGroup;
  constructor(private route: ActivatedRoute, 
    private messagesService: MessagesService, 
    private changeDetectorRef: ChangeDetectorRef) {
    // console.log(this.route.snapshot.params['userName']);
  
  }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (res) => {
        this.member = res['member'];
        this.getImages();
        }
    });

    this.route.queryParams.subscribe({
      next:(params) => {
        if(params['tab'] ) {
          console.log("🚀 ~ file: member-details.component.ts:37 ~ MemberDetailsComponent ~ ngOnInit ~ params['tab']:", params['tab'])
          this.goMessage(params['tab'], true);
        }
      }
    })

  
  }

  onTabChange($event: any){
    if($event.tab.textLabel === 'Messages' ) {
      this.loadMessages();
    }
  }

  goMessage(tabTitles: string, isLoadFromParam = false) {
    const tabGroup = this.myMessageTab;
    if(!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    if(isLoadFromParam) {
      if(this.myMessageTab) {
        this.myMessageTab.selectedIndex = 4;
        this.loadMessages();
      }
    } else {
      tabGroup._tabs['_results'].forEach((element: MatTab) => {
        if(element.textLabel === tabTitles) {
          if(this.myMessageTab) {
            this.myMessageTab.selectedIndex = element.position;
          }
        }
    });
    }

  }

  loadMessages( ) {
    if(!this.member.userName) return;
    console.log("🚀 ~ file: member-details.component.ts:75 ~ MemberDetailsComponent ~ loadMessages ~ this.member.userName:", this.member.userName)

    this.messagesService.getMessagesThread(this.member.userName).subscribe({
        next: (res) => this.messages = res
    })
  }

  private getImages() {
      if(!this.member) return [];

      for(const photo of this.member.photos){
        this.imageGallary.push(new ImageItem({src: photo.url, thumb: photo.url}));
        this.imageGallary.push(new ImageItem({src: photo.url, thumb: photo.url}));
      }
      return [];
  }


}
