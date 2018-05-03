export interface User {
    id?: number;
    email?: string;
    password?: string;
    name: string;
    avatar?: string;
    projectIds?: number[];
    // constructor(id, email, password, name, avatar) {
    //     this.id = id;
    //     this.email = email;
    //     this.password = password;
    //     this.name = name;
    //     this.avatar = avatar;
    // }
}
