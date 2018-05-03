export class Project {
    id?: number;
    title: string;
    descT: string;
    image: string;
    constructor(id: number, title: string, descT: string, image: string) {
        this.id = id;
        this.title = title;
        this.descT = descT;
        this.image = image;
    }
}
