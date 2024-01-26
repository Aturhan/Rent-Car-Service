import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext){
        return super.canActivate(context)
    }
    handleRequest<TUser = any>(err,user,info): TUser {
        if(err || !user) {
            throw err || new UnauthorizedException()
        }
        return user
    }
}