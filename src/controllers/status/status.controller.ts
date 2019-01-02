import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import { StatusService } from "../../services/status/status.service";
import { Symbols } from "../../ioc/symbols";

@controller("/status")
export class StatusController implements interfaces.Controller {

    constructor( @inject(Symbols.StatusService) private statusService: StatusService ) {}

    @httpGet("/")
    private index(req: express.Request, res: express.Response, next: express.NextFunction): string {
        return this.statusService.get({}).toString();
    }
}