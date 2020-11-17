import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HeaderService {
    scrollYSubject = new BehaviorSubject<number>(0)
    scrollY = this.scrollYSubject.asObservable()
    currentComponent: string
    isMobile: boolean
    
    setScrollY(scrollY: number){
        this.scrollYSubject.next(scrollY)
    }
}