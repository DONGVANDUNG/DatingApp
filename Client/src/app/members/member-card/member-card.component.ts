import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  constructor(
    private memberSevice: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.memberSevice.addLike(member.user).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    });
  }
}
