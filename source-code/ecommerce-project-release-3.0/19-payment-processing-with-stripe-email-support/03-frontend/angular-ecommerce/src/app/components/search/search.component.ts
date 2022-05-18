import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, fromEvent, Observable, startWith, Subscription, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {


    searchBox = document.getElementById('searchBox') as HTMLInputElement;


    @ViewChild('myInput')
    input: ElementRef;
    private subscription: Subscription;


    constructor(private router: Router) {
    }

    ngAfterViewInit(): void {
        const searchText$: Observable<string> =
            fromEvent<any>(this.input.nativeElement, 'keyup')
                .pipe(
                    map(event => event.target.value),
                    startWith(''),
                    debounceTime(400),
                    distinctUntilChanged()
                );

        this.subscription = searchText$.pipe(
            switchMap(search => this.router.navigateByUrl(`/search/${search}`)
            )).subscribe(x => console.log(x));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit() {

    }

    doSearch(value: string) {
        console.log(`value=${value}`);
        this.router.navigateByUrl(`/search/${value}`);
    }


}
