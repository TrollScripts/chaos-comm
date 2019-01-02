import { injectable } from "inversify";

@injectable()
export class StatusService {

    get(input: any): number {
        return 1;
    }
}