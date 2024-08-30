import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FormcontrolNameGenerator {
    public transformString(inputString: string): string {
        let replacedSpacesString: string = inputString.replace(/\s+/g, '_');
        let replaceWithLowerCases: string = replacedSpacesString.toLowerCase();
        return replaceWithLowerCases;
    }
}