export interface  UserImage {

        name: string,
        fileList: FileList,
        address?: {
            street?: string; // required
            postcode?: string;
    },
    

}