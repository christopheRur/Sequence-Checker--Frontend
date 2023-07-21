import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { sequence } from 'src/app/sequence';
import { Location } from '@angular/common';
import { Router } from '@angular/router'

import { SequencerService } from 'src/app/service/sequencer.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.css'],
})
export class CheckerComponent implements OnInit {
  jackPot: string = '';
  allMatches: string = '';

  tag: number = 0;
  seq: string = '';
  inputSequence: string = '';

  sequence!: sequence[];
  fourMatches!:sequence[];
  threeMatches!:sequence[];
  twoMatches!:sequence[];
  oneMatches!:sequence[];

  showDropDown: boolean = false;
  constructor(
    private seqService: SequencerService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSequences();
  }

  toggleDropdown(): boolean {
    this.showDropDown = !this.showDropDown;
    return this.showDropDown;
  }

  public confirmJackpot(): void {
    const url = 'https://www.ohiolottery.com/Games/DrawGames/Rolling-Cash-5';
    window.location.href = url;
  }

  /**
 *Will reload the passage
 */
 public refreshPage() {
  window.location.reload();
}

  /**
   * Retrieve all senders from db.
   */
  public getSequences(): void {
    this.seqService.retrieveSequences().subscribe(
      (response: sequence[]) => {
        this.sequence = response.reverse();

        //console.log(this.sequence);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
/**
 *Retrieve 4 matches
 */
  public get4sequenceSeries(): void {
    let body = {
      sequence: this.jackPot,
    };

    this.seqService.retrieve4SeqList(body).subscribe(
      (response: sequence[]) => {
        this.fourMatches = response;

        console.log(this.fourMatches);
        this.get1sequenceSeries()
        this.get3sequenceSeries();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
 *Retrieve 3 matches
 */
 public get3sequenceSeries(): void {
  let body = {
    sequence: this.jackPot,
  };

  this.seqService.retrieve3SeqList(body).subscribe(
    (response: sequence[]) => {
      this.threeMatches = response;
      console.log(this.threeMatches);
      this.get2sequenceSeries();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

  /**
 *Retrieve 2 matches
 */
 public get2sequenceSeries(): void {
  let body = {
    sequence: this.jackPot,
  };

  this.seqService.retrieve2SeqList(body).subscribe(
    (response: sequence[]) => {
      this.twoMatches = response;
      console.log(this.twoMatches);

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

  /**
 *Retrieve 1 matche
 */
 public get1sequenceSeries(): void {
  let body = {
    sequence: this.jackPot,
  };

  this.seqService.retrieve1SeqList(body).subscribe(
    (response: sequence[]) => {
      this.oneMatches = response;
      console.log(this.oneMatches);

      console.log("Done Checking!!!");
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}



  /**
   *Retrieve the jackpot
   */
  public getJackpot(): void {
    let body = {
      sequence: this.jackPot,
    };

    this.seqService.retrieveJackpot(body).subscribe(
      (response: sequence) => {
        this.allMatches = response.sequence;
        alert('Checked Jackpot!!!!!!!!!!!'+this.allMatches);
       this.get4sequenceSeries();
       console.log(this.allMatches)

      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  /**
   * Add sequence in db.
   */
  public addSequence(): void {
    let body = {
      tag: this.tag,
      sequence: this.seq,
      inputSequence: this.inputSequence,
    };
if(body.sequence.length==0) alert("No Sequence was entered");

    this.seqService.addSequences(body).subscribe(
      (response: sequence) => {
        this.refreshPage();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
