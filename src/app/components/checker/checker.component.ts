import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { sequence } from 'src/app/sequence';
import { Location } from '@angular/common';

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
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSequences();
  }

  toggleDropdown(): boolean {
    this.showDropDown = !this.showDropDown;
    return this.showDropDown;
  }
/**
 *To eliminate duplicates
 * @param numbers
 * @returns
 */
  public removeDuplicates(seqs: string): Set<string> {

    const uniqueSet: Set<string> = new Set();
    uniqueSet.add(seqs);



    // Convert the Set back to a list
    const uniqueList: string[] = Array.from(uniqueSet);
    console.log("->"+uniqueList)


    return uniqueSet;
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
        this.fourMatches = response.reverse()

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
      this.threeMatches = response.reverse();
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
      this.twoMatches = response.reverse();
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
      this.oneMatches = response.reverse();
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
